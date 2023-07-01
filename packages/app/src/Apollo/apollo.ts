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
  
  import Constants from "expo-constants";
  
  const GQL_HOSTNAME = Constants?.manifest?.extra?.gqlHostname;
  const WEBSOCKET_PREFIX = Constants?.manifest?.extra?.wsPrefix;
  const HTTP_PREFIX = Constants?.manifest?.extra?.httpPrefix;
  export const tokenVar = makeVar("");
  
  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${WEBSOCKET_PREFIX}://${GQL_HOSTNAME}`,
      connectionParams: async () => {
        return {
          authorization: tokenVar() ? `Bearer ${tokenVar()}` : "",
        };
      },
    })
  );
  
  const httpLink = new HttpLink({
    uri: `${HTTP_PREFIX}://${GQL_HOSTNAME}`,
  });
  
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
  
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );
  
  export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });
  