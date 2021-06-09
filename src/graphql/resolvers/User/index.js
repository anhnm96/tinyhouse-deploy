"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const utils_1 = require("../../../lib/utils");
exports.userResolvers = {
    Query: {
        user: async (_root, { id }, { db, req }) => {
            try {
                const user = await db.users.findOne({ _id: id });
                if (!user) {
                    throw new Error("user can't be found");
                }
                const viewer = await utils_1.authorize(db, req);
                if (viewer && viewer._id === user._id) {
                    user.authorized = true;
                }
                return user;
            }
            catch (error) {
                throw new Error(`Failed to query user: ${error}`);
            }
        }
    },
    User: {
        id: ({ _id }) => _id,
        hasWallet: (user) => Boolean(user.walletId),
        income: ({ authorized, income }) => authorized ? income : null,
        bookings: async ({ authorized, bookings }, { limit, page }, { db }) => {
            try {
                if (!authorized)
                    return null;
                const data = {
                    total: 0,
                    result: []
                };
                let cursor = await db.bookings.find({
                    _id: { $in: bookings }
                });
                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0).limit(limit);
                data.total = await cursor.count();
                data.result = await cursor.toArray();
                return data;
            }
            catch (error) {
                throw new Error(`Failed to query user bookings: ${error}`);
            }
        },
        listings: async ({ listings }, { limit, page }, { db }) => {
            try {
                const data = {
                    total: 0,
                    result: []
                };
                let cursor = await db.listings.find({ _id: { $in: listings } });
                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0).limit(limit);
                data.total = await cursor.count();
                data.result = await cursor.toArray();
                return data;
            }
            catch (error) {
                throw new Error(`Failed to query user listings: ${error}`);
            }
        }
    }
};
