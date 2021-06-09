"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const client = new stripe_1.default(`${process.env.S_SECRET_KEY}`, {
    apiVersion: "2020-08-27"
});
exports.Stripe = {
    connect: async (code) => {
        const response = await client.oauth.token({
            grant_type: "authorization_code",
            code
        });
        if (!response) {
            throw new Error("failed to connect to stripe");
        }
        return response;
    },
    async disconnect(stripeUserId) {
        const response = await client.oauth.deauthorize({
            client_id: process.env.S_CLIENT_ID,
            stripe_user_id: stripeUserId
        });
        return response;
    },
    charge: async (amount, source, stripeAccount) => {
        // https://stripe.com/docs/connect/direct-charges
        const res = await client.charges.create({
            amount,
            currency: "usd",
            source,
            application_fee_amount: Math.round(amount * 0.05)
        }, { stripeAccount });
        if (res.status !== "succeeded") {
            throw new Error("failed to created charge with Stripe.");
        }
    },
};
