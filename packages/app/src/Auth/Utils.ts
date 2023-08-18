import { Alert } from "react-native";
import { client } from "../Apollo/apollo";
import { gql } from "@apollo/client";

const AUTHORIZE = gql`
  query Authenticate($identifier: String!, $password: String!) {
    authenticate(identifier: $identifier, password: $password)
  }
`;

const VERIFY = gql`
  query Verify($token: String!) {
    verifyToken(token: $token)
  }
`;

const REGISTER = gql`
  mutation CreateUser(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      name: $name
      username: $username
      email: $email
      password: $password
    )
  }
`;

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      _id
      created
      last_updated
      username
      name
      email
      locations
      routes
      ratings
      comments
      preferences {
        private
      }
      verified
      bio
      routesetter {
        routes_created
        companies
        routesetting_since
      }
      gym_admin {
        companies
        readonly
      }
      gym_info {
        company_name
        phone_number
      }
    }
  }
`;

// Login function supporting username or email login
export async function authorize(identifier: string, password: string) {
  // Query the backend
  // Correct credentials will prompt GraphQL to return a token
  try {
    var res = await client.query({
      query: AUTHORIZE,
      variables: {
        identifier,
        password,
      },
      fetchPolicy: "no-cache",
    });

    // Return the auth token
    return res.data.authenticate;
  } catch (err) {
    Alert.alert("Sorry!", err.message);
  }
}

export async function verifyToken(token: string) {
  if (!token) return false;
  var res = await client.query({
    query: VERIFY,
    variables: {
      token,
    },
    fetchPolicy: "no-cache",
  });
  return res.data.verifyToken;
}

// User creation function
export async function createAccount(
  name: string,
  username: string,
  email: string,
  password: string
) {
  // Query the backend
  try {
    var res = await client.mutate({
      mutation: REGISTER,
      variables: {
        name,
        username,
        email,
        password,
      },
      fetchPolicy: "no-cache",
    });

    // Return the auth token if successful
    console.log("Created user with authorization token", res.data?.createUser);
    return res.data.createUser;
  } catch (err) {
    Alert.alert("Whoops!", err.message);
  }
}

export async function fetchUser() {
  var res = await client.query({
    query: CURRENT_USER,
  });
  return res.data?.currentUser;
}
