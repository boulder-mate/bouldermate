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
  const gqlUrl = `${env.HTTP_PREFIX}://${env.GQL_HOSTNAME}`
  console.log("Initialising GQL at URL", gqlUrl)
  
  const uploadsLink = createUploadLink({ uri: gqlUrl, credentials: "same-origin" })

  const authLink = new ApolloLink((operation, forward) => {
    var headers = {
      'Apollo-Require-Preflight': true
    }

    if (tokenVar()) {
      headers['Authorization'] = `Bearer ${tokenVar()}`
    }

    operation.setContext({
      headers
    });
    return forward(operation);
  });
  
  export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(uploadsLink),
  });
  