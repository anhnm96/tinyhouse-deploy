"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewerResolvers = void 0;
const crypto_1 = __importDefault(require("crypto"));
const api_1 = require("../../../lib/api");
const utils_1 = require("../../../lib/utils");
const cookieOptions = {
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: process.env.NODE_ENV === 'development' ? false : true // cookie can only be sent over https
};
async function loginViaGoogle(code, token, db, res) {
    const { user } = await api_1.Google.login(code);
    if (!user) {
        throw new Error('Google login error');
    }
    // Name/Photo/Email lists
    const userNamesList = user.names && user.names.length ? user.names : null;
    const userPhotosList = user.photos && user.photos.length ? user.photos : null;
    const userEmailsList = user.emailAddresses && user.emailAddresses.length ? user.emailAddresses : null;
    // user display name
    const userName = userNamesList ? userNamesList[0].displayName : null;
    // user id
    const userId = userNamesList &&
        userNamesList[0].metadata &&
        userNamesList[0].metadata.source
        ? userNamesList[0].metadata.source.id
        : null;
    // user avatar
    const userAvatar = userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;
    // user email
    const userEmail = userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null;
    if (!userId || !userName || !userAvatar || !userEmail) {
        throw new Error("Google login error");
    }
    const updateRes = await db.users.findOneAndUpdate({ _id: userId }, {
        $set: {
            name: userName,
            avatar: userAvatar,
            contact: userEmail,
            token
        }
    }, { returnOriginal: false });
    let viewer = updateRes.value;
    if (!viewer) {
        const insertResult = await db.users.insertOne({
            _id: userId,
            token,
            name: userName,
            avatar: userAvatar,
            contact: userEmail,
            income: 0,
            bookings: [],
            listings: []
        });
        viewer = insertResult.ops[0];
    }
    res.cookie('viewer', userId, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    return viewer;
}
const logInViaCookie = async (token, db, req, res) => {
    const updateRes = await db.users.findOneAndUpdate({ _id: req.signedCookies.viewer }, { $set: { token } }, { returnOriginal: false });
    const viewer = updateRes.value;
    if (!viewer) {
        res.clearCookie("viewer", cookieOptions);
    }
    return viewer;
};
exports.viewerResolvers = {
    Query: {
        authUrl: () => {
            try {
                return api_1.Google.authUrl;
            }
            catch (error) {
                throw new Error(`Failed to query Google Auth Url: ${error}`);
            }
        }
    },
    Mutation: {
        login: async (_root, { input }, { db, req, res }) => {
            try {
                const code = input ? input.code : null;
                const token = crypto_1.default.randomBytes(16).toString('hex');
                const viewer = code
                    ? await loginViaGoogle(code, token, db, res)
                    : await logInViaCookie(token, db, req, res);
                if (!viewer) {
                    return { didRequest: true };
                }
                return {
                    _id: viewer._id,
                    token: viewer.token,
                    avatar: viewer.avatar,
                    walletId: viewer.walletId,
                    didRequest: true
                };
            }
            catch (error) {
                throw new Error(`Failed to login: ${error}`);
            }
        },
        logout: (_root, _args, { res }) => {
            try {
                res.clearCookie('viewer', cookieOptions);
                return { didRequest: true };
            }
            catch (error) {
                throw new Error(`Failed to logout: ${error}`);
            }
        },
        connectStripe: async (_root, { input }, { db, req }) => {
            try {
                const { code } = input;
                let viewer = await utils_1.authorize(db, req);
                console.log(viewer);
                if (!viewer) {
                    throw new Error("viewer cannot be found");
                }
                const wallet = await api_1.Stripe.connect(code);
                if (!wallet) {
                    throw new Error("stripe grant error");
                }
                const updateRes = await db.users.findOneAndUpdate({ _id: viewer._id }, { $set: { walletId: wallet.stripe_user_id } }, { returnOriginal: false });
                if (!updateRes.value) {
                    throw new Error("viewer could not be updated");
                }
                viewer = updateRes.value;
                return {
                    _id: viewer._id,
                    token: viewer.token,
                    avatar: viewer.avatar,
                    walletId: viewer.walletId,
                    didRequest: true
                };
            }
            catch (error) {
                throw new Error(`Failed to connect with Stripe: ${error}`);
            }
        },
        disconnectStripe: async (_root, _args, { db, req }) => {
            try {
                let viewer = await utils_1.authorize(db, req);
                if (!viewer || !viewer.walletId) {
                    throw new Error("viewer cannot be found or has not connected with Stripe");
                }
                const wallet = await api_1.Stripe.disconnect(viewer.walletId);
                if (!wallet) {
                    throw new Error("stripe disconnect error");
                }
                console.log('after wallet');
                const updateRes = await db.users.findOneAndUpdate({ _id: viewer._id }, { $set: { walletId: undefined } }, { returnOriginal: false });
                if (!updateRes.value) {
                    throw new Error("viewer could not be updated");
                }
                viewer = updateRes.value;
                return {
                    _id: viewer._id,
                    token: viewer.token,
                    avatar: viewer.avatar,
                    walletId: viewer.walletId,
                    didRequest: true
                };
            }
            catch (error) {
                throw new Error(`Failed to disconnect with Stripe: ${error}`);
            }
        }
    },
    Viewer: {
        id: (viewer) => viewer._id,
        hasWallet: (viewer) => viewer.walletId ? true : undefined
    }
};
