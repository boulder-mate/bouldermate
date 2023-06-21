import { GraphQLUpload } from "graphql-upload";
import { routeMutations } from "../routes/RouteMutations";
import { routeQueries } from "../routes/RouteQueries";

export const resolvers = {
    Upload: GraphQLUpload,
    Query: {
      ...routeQueries
    },
    Mutation: {
      ...routeMutations
    },
    //Subscription: {},
  };