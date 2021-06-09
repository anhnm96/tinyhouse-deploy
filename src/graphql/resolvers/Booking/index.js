"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingResolvers = void 0;
const utils_1 = require("../../../lib/utils");
const api_1 = require("../../../lib/api");
const mongodb_1 = require("mongodb");
const resolveBookingsIndex = (bookingsIndex, checkInDate, checkOutDate) => {
    let dateCursor = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const newBookingsIndex = { ...bookingsIndex };
    while (dateCursor <= checkOut) {
        const year = dateCursor.getUTCFullYear();
        const month = dateCursor.getUTCMonth();
        const day = dateCursor.getUTCDate();
        if (!newBookingsIndex[year]) {
            newBookingsIndex[year] = {};
        }
        if (!newBookingsIndex[year][month]) {
            newBookingsIndex[year][month] = {};
        }
        if (!newBookingsIndex[year][month][day]) {
            newBookingsIndex[year][month][day] = true;
        }
        else {
            throw new Error("selected dates can't overlap dates that have already been booked");
        }
        dateCursor = new Date(dateCursor.getTime() + 86400000);
    }
    return newBookingsIndex;
};
exports.bookingResolvers = {
    Mutation: {
        createBooking: async (_root, { input }, { db, req }) => {
            try {
                const { id, source, checkIn, checkOut } = input;
                // verify a logged in user is making the request
                const viewer = await utils_1.authorize(db, req);
                if (!viewer) {
                    throw new Error("viewer can't be found");
                }
                // find listing document from database
                const listing = await db.listings.findOne({ _id: new mongodb_1.ObjectId(id) });
                if (!listing) {
                    throw new Error("listing can't be found");
                }
                // check that viewer is not booking his own listing
                if (listing.host === viewer._id) {
                    throw new Error("viewer can't book own listing");
                }
                // check that checkout > checkin
                const checkInDate = new Date(checkIn);
                const checkOutDate = new Date(checkOut);
                if (checkOutDate < checkInDate) {
                    throw new Error("check out date can't be before check in date");
                }
                // create a new bookingsIndex for listing being booked
                const bookingsIndex = resolveBookingsIndex(listing.bookingsIndex, checkIn, checkOut);
                // get total price to charge
                const totalPrice = listing.price *
                    ((checkOutDate.getTime() - checkInDate.getTime()) / 86400000 + 1);
                // get user document of host
                const host = await db.users.findOne({ _id: listing.host });
                console.log('host', host);
                if (!host || !host.walletId) {
                    throw new Error("the host either can't be found or isn't connected with Stripe");
                }
                // create stripe charge
                await api_1.Stripe.charge(totalPrice, source, host.walletId);
                // insert new booking in db
                const insertRes = await db.bookings.insertOne({
                    _id: new mongodb_1.ObjectId(),
                    listing: listing._id,
                    tenant: viewer._id,
                    checkIn,
                    checkOut
                });
                const insertedBooking = insertRes.ops[0];
                // update host's income in db
                await db.users.updateOne({ _id: host._id }, { $inc: { income: totalPrice } });
                // update booking field for tenant in db
                await db.users.updateOne({ _id: viewer._id }, { $push: { bookings: insertedBooking._id } });
                // update booking field for listing in db
                await db.listings.updateOne({ _id: listing._id }, { $set: { bookingsIndex }, $push: { bookings: insertedBooking._id } });
                // return newly inserted booking
                return insertedBooking;
            }
            catch (error) {
                throw new Error(`Failed to create a booking: ${error}`);
            }
        }
    },
    Booking: {
        id: (booking) => booking._id.toString(),
        listing: (booking, _args, { db }) => {
            return db.listings.findOne({ _id: booking.listing });
        },
        tenant: async ({ tenant }, _args, { db }) => {
            const user = await db.users.findOne({ _id: tenant });
            if (!user) {
                throw new Error(`could not find tenant`);
            }
            return user;
        }
    }
};
