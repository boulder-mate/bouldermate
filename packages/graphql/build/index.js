"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const schemaloader_1 = __importDefault(require("./schemaloader"));
const ws_1 = require("ws");
const http_1 = require("http");
const apollo_server_core_1 = require("apollo-server-core");
const schema_1 = require("@graphql-tools/schema");
const ws_2 = require("graphql-ws/lib/use/ws");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_upload_1 = require("graphql-upload");
const ResolveAuthContext_1 = require("./auth/ResolveAuthContext");
var Fingerprint = require("express-fingerprint");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, graphql_upload_1.graphqlUploadExpress)({ maxFileSize: 10000000, maxFiles: 10 }));
app.use(Fingerprint());
//Load the service account from ENV
var urlEncodedServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
// Need to initialise MongoDB and AWS stuff
const typeDefs = (0, apollo_server_express_1.gql) `
  ${schemaloader_1.default}
`;
exports.pubsub = new graphql_subscriptions_1.PubSub();
const resolvers = {
    Upload: graphql_upload_1.GraphQLUpload,
    Query: {
    // ...deviceQueries,
    // ...locationsQueries,
    // ...paymentsQueries,
    // ...presetsQueries,
    // ...rfidQueries,
    // ...sessionsQueries,
    // ...tariffsQueries,
    // ...tenanciesQueries,
    // ...usersQueries,
    // ...loggingQueries,
    // ...DLBQueries,
    // ...metadataQueries,
    },
    Mutation: {
    // ...deviceMutations,
    // ...locationMutations,
    // ...paymentsMutations,
    // ...presetsMutations,
    // ...rfidMutations,
    // ...tariffsMutations,
    // ...tenanciesMutations,
    // ...userMutations,
    // ...DLBMutations,
    // ...OCPPMutations
    },
    Subscription: {
    // ...sessionsSubscriptions,
    },
};
//Combine our typedefs + resolvers.
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
const httpServer = (0, http_1.createServer)(app);
// Creating the WebSocket server
const wsServer = new ws_1.Server({
    path: "/",
    server: httpServer,
});
const serverCleanup = (0, ws_2.useServer)({
    schema,
    context: ResolveAuthContext_1.resolveWSContext,
}, wsServer);
const server = new apollo_server_express_1.ApolloServer({
    schema,
    context: ResolveAuthContext_1.resolveContext,
    plugins: [
        (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});
async function startServer() {
    // These setup methods account for undefined behaviour of docUpdate subscription methods when instantiating each Cache.
    const PORT = process.env.PORT || 8000;
    await server.start();
    server.applyMiddleware({ app, path: "/" });
    httpServer.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    });
}
startServer();
//# sourceMappingURL=index.js.map