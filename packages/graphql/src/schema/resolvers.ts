import { GraphQLUpload } from "graphql-upload";
import { routeMutations } from "../routes/RouteMutations";
import { routeQueries } from "../routes/RouteQueries";
import { userMutations } from "../auth/UserMutations";
import { userQueries } from "../auth/UserQueries";

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...routeQueries,
    ...userQueries,
  },
  Mutation: {
    ...routeMutations,
    ...userMutations,
  },
  //Subscription: {},
};
