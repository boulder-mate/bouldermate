import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
    split,
  } from "@apollo/client";
  import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
  import { getMainDefinition } from "@apollo/client/utilities";
  import { createClient } from "graphql-ws";
  import { makeVar } from "@apollo/client";
  import { createUploadLink } from "apollo-upload-client";
  
  import env from "../envManager";
  
  export const tokenVar = makeVar("");
  
  const authLink = new ApolloLink((operation, forward) => {
    if (tokenVar()) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${tokenVar()}`,
        },
      });
    }
    return forward(operation);
  });
  
  export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({ uri: `${env.HTTP_PREFIX}://${env.GQL_HOSTNAME}` }),
  });
  