import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import GQL_SCHEMA_FILES from "./schemaloader";

import { Server } from "ws";

import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";
import { Request, Response } from "express";

import { ApolloServer, gql } from "apollo-server-express";
import { GraphQLUpload, graphqlUploadExpress } from "graphql-upload";

import {
  AuthContext,
  findUserByUID,
  resolveContext,
  resolveWSContext,
} from "./auth/ResolveAuthContext";

var Fingerprint = require("express-fingerprint");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
app.use(Fingerprint());

//Load the service account from ENV
var urlEncodedServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

// Need to initialise MongoDB and AWS stuff



const typeDefs = gql`
  ${GQL_SCHEMA_FILES}
`;

export const pubsub = new PubSub();

const resolvers = {
  Upload: GraphQLUpload,
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
const schema = makeExecutableSchema({ typeDefs, resolvers });

const httpServer = createServer(app);

// Creating the WebSocket server
const wsServer = new Server({
  path: "/",
  server: httpServer,
});

const serverCleanup = useServer(
  {
    schema,
    context: resolveWSContext,
  },
  wsServer
);

const server = new ApolloServer({
  schema,
  context: resolveContext,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
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
