import { schema } from "./schema/schema";

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { AuthContext, resolveContext } from "./auth/ResolveAuthContext";

import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import { createServer } from "http";
import { graphqlUploadExpress } from "graphql-upload";
import { expressMiddleware } from "@apollo/server/express4";
import { Logger } from "./utils/logging";
import env from "./envManager";

var Fingerprint = require("express-fingerprint");

var logger = new Logger("Server");

// Initialise Express App
export const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
app.use(Fingerprint());

// Initialise HTTP server
export const httpServer = createServer(app);

// Initialise Apollo Server
export const server = new ApolloServer<AuthContext>({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Main function for the server
export async function initApolloServer() {
  logger.info("Initialising Apollo server...");
  const PORT = env.PORT || 8080;
  await server.start();

  httpServer.listen(PORT, () => {
    logger.info(`Listening on ${PORT}`);
  });

  app.use(
    "/",
    cors<cors.CorsRequest>(),
    bodyParser.json({ limit: "50mb" }),
    expressMiddleware(server, {
      context: async (args) => resolveContext(args),
    })
  );
  logger.info("Apollo Server initialised with auth middleware!");
}
