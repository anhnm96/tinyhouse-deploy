"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line
process.env.NODE_ENV === 'development' && require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const database_1 = require("./database");
const graphql_1 = require("./graphql");
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const mount = async (app) => {
    const db = await database_1.connectDatabase();
    // limit 2mb to allow upload image base64
    app.use(express_1.default.json({ limit: '2mb' }));
    app.use(cookie_parser_1.default(process.env.SECRET));
    app.use(cors_1.default({ origin: process.env.PUBLIC_URL, credentials: true }));
    app.use(compression_1.default());
    app.use(express_1.default.static(`${__dirname}/client`));
    app.get('/*', (_req, res) => res.sendFile(`${__dirname}/client/index.html`));
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: graphql_1.typeDefs,
        resolvers: graphql_1.resolvers,
        context: ({ req, res }) => ({ db, req, res })
    });
    server.applyMiddleware({ app, path: '/api', cors: false });
    app.listen(process.env.PORT);
};
mount(express_1.default());
