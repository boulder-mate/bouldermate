import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./typedefs";
import { resolvers } from "./resolvers";

//Combine our typedefs + resolvers.
export const schema = makeExecutableSchema({ typeDefs, resolvers });



