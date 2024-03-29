import { GraphQLUpload } from "graphql-upload";
import { routeMutations } from "../routes/RouteMutations";
import { routeQueries } from "../routes/RouteQueries";
import { userMutations } from "../users/UserMutations";
import { userQueries } from "../users/UserQueries";
import { locationMutations } from "../locations/LocationMutations";
import { locationQueries } from "../locations/LocationQueries";

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...routeQueries,
    ...userQueries,
    ...locationQueries,
  },
  Mutation: {
    ...routeMutations,
    ...userMutations,
    ...locationMutations,
  },
  //Subscription: {},
};
