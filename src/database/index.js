"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongodb_1 = require("mongodb");
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const url = `mongodb://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@cluster0-shard-00-00.${process.env.DB_CLUSTER}.mongodb.net:27017,cluster0-shard-00-01.${process.env.DB_CLUSTER}.mongodb.net:27017,cluster0-shard-00-02.${process.env.DB_CLUSTER}.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-13xdq4-shard-0&authSource=admin&retryWrites=true&w=majority`
const connectDatabase = async () => {
    try {
        const client = await mongodb_1.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('main');
        return {
            listings: db.collection('listings'),
            bookings: db.collection('bookings'),
            users: db.collection("users")
        };
    }
    catch (error) {
        throw new Error(`Unable to connect to the database ${error}`);
    }
};
exports.connectDatabase = connectDatabase;
