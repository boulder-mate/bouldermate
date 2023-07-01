import {schema} from "./schema/schema"

import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import {
    AuthContext,
    resolveContext,
    resolveWSContext,
  } from "./auth/ResolveAuthContext";

import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import { Server } from "ws";
import { createServer } from "http";
import { graphqlUploadExpress } from "graphql-upload";
import { expressMiddleware } from '@apollo/server/express4';

var Fingerprint = require("express-fingerprint");

// Initialise Express App
export const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
app.use(Fingerprint());

// Initialise HTTP server
export const httpServer = createServer(app);

// Initialise WS server
export const wsServer = new Server({
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

// Initialise Apollo Server
export const server = new ApolloServer<AuthContext>({
  schema,
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

// Main function for the server
export async function initApolloServer() {
  console.log("Initialising Apollo server...")
  const PORT = process.env.PORT || 8080;
  await server.start();

  httpServer.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });

  app.use(
    '/',
    cors<cors.CorsRequest>(),
    bodyParser.json({ limit: '50mb' }),
    expressMiddleware(server, {
      context: async ({ req }) => resolveContext(req),
    }),
  );
  console.log("Apollo Server initialised with auth middleware!")
}