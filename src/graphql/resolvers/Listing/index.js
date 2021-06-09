"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listingResolvers = void 0;
const mongodb_1 = require("mongodb");
const types_1 = require("./types");
const utils_1 = require("../../../lib/utils");
const api_1 = require("../../../lib/api");
const types_2 = require("../../../lib/types");
const verifyHostListingInput = (input) => {
    const { title, description, type, price } = input;
    if (title.length > 100) {
        throw new Error("listing title must be under 100 characters.");
    }
    if (description.length > 5000) {
        throw new Error("listing description must be under 5000 characters.");
    }
    if (type !== types_2.ListingType.Apartment && type !== types_2.ListingType.House) {
        throw new Error("Listing type must be either apartment or house.");
    }
    if (price < 0) {
        throw new Error("Price must be greater than 0.");
    }
};
exports.listingResolvers = {
    Query: {
        listing: async (_root, { id }, { db, req }) => {
            try {
                const listing = await db.listings.findOne({ _id: new mongodb_1.ObjectId(id) });
                if (!listing) {
                    throw new Error("listing can't be found");
                }
                const viewer = await utils_1.authorize(db, req);
                if (viewer && viewer._id === listing.host) {
                    listing.authorized = true;
                }
                return listing;
            }
            catch (error) {
                throw new Error(`Failed to query listing: ${error}`);
            }
        },
        listings: async (_root, { location, filter, limit, page }, { db }) => {
            try {
                const query = {};
                const data = {
                    region: null,
                    total: 0,
                    result: []
                };
                if (location) {
                    const { country, admin, city } = await api_1.Google.geocode(location);
                    if (city)
                        query.city = city;
                    if (admin)
                        query.admin = admin;
                    if (country) {
                        query.country = country;
                    }
                    else {
                        throw new Error("no country found");
                    }
                    const cityText = city ? `${city}, ` : "";
                    const adminText = admin ? `${admin}, ` : "";
                    data.region = `${cityText}${adminText}${country}`;
                }
                const cursor = db.listings.find(query);
                if (filter === types_1.ListingsFilter.PRICE_LOW_TO_HIGH) {
                    cursor.sort({
                        price: 1
                    });
                }
                if (filter === types_1.ListingsFilter.PRICE_HIGH_TO_LOW) {
                    cursor.sort({
                        price: -1
                    });
                }
                cursor.skip(page > 0 ? (page - 1) * limit : 0).limit(limit);
                data.total = await cursor.count();
                data.result = await cursor.toArray();
                return data;
            }
            catch (error) {
                throw new Error(`Failed to query listings: ${error}`);
            }
        }
    },
    Mutation: {
        hostListing: async (_root, { input }, { db, req }) => {
            verifyHostListingInput(input);
            const viewer = await utils_1.authorize(db, req);
            if (!viewer) {
                throw new Error("viewer can't be found.");
            }
            const { country, admin, city } = await api_1.Google.geocode(input.address);
            if (!country || !admin || !city) {
                throw new Error("invalid address input.");
            }
            const imageUrl = await api_1.Cloudinary.upload(input.image);
            const insertResult = await db.listings.insertOne({
                _id: new mongodb_1.ObjectId(),
                ...input,
                image: imageUrl,
                bookings: [],
                bookingsIndex: {},
                country,
                admin,
                city,
                host: viewer._id
            });
            const insertedListing = insertResult.ops[0];
            await db.users.updateOne({ _id: viewer._id }, {
                $push: {
                    listings: insertedListing._id
                }
            });
            return insertedListing;
        }
    },
    Listing: {
        id: (listing) => listing._id.toString(),
        host: async ({ host }, _args, { db }) => {
            const user = await db.users.findOne({ _id: host });
            if (!user) {
                throw new Error("host can't be found");
            }
            return user;
        },
        bookingsIndex: ({ bookingsIndex }) => {
            console.log('bookingsIndex', bookingsIndex);
            return JSON.stringify(bookingsIndex);
        },
        bookings: async ({ authorized, bookings }, { limit, page }, { db }) => {
            try {
                if (!authorized) {
                    return null;
                }
                const data = {
                    total: 0,
                    result: []
                };
                const cursor = db.bookings.find({ _id: { $in: bookings } });
                cursor.skip(page > 0 ? (page - 1) * limit : 0).limit(limit);
                data.total = await cursor.count();
                data.result = await cursor.toArray();
                return data;
            }
            catch (error) {
                throw new Error(`Failed to query listing's bookings: ${error}`);
            }
        }
    }
};
