import GQL_SCHEMA_FILES from "./schemaloader";

import { PubSub } from "graphql-subscriptions";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServer, gql } from "apollo-server-express";
import { GraphQLUpload } from "graphql-upload";

import {
    AuthContext,
    findUserByUID,
    resolveContext,
    resolveWSContext,
  } from "./auth/ResolveAuthContext";

import { routeMutations } from "./routes/RouteMutations";
import { routeQueries } from "./routes/RouteQueries";

import { httpServer, wsServer } from "./express";

// Initialise GraphQL
const typeDefs = gql`
  ${GQL_SCHEMA_FILES}
`;

export const pubsub = new PubSub();

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...routeQueries
  },
  Mutation: {
    ...routeMutations
  },
  //Subscription: {},
};

//Combine our typedefs + resolvers.
const schema = makeExecutableSchema({ typeDefs, resolvers });

const serverCleanup = useServer(
  {
    schema,
    context: resolveWSContext,
  },
  wsServer
);

// Initialise Apollo Server
export const server = new ApolloServer({
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