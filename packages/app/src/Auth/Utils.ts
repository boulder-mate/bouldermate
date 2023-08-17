import { client, tokenVar } from "../Apollo/apollo";
import { gql } from "@apollo/client";

const AUTHORIZE = gql`
  query Authenticate($identifier: String!, $password: String!) {
    authenticate(identifier: $identifier, password: $password)
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
  var res = await client.query({
    query: AUTHORIZE,
    variables: {
      identifier,
      password,
    },
    fetchPolicy: "no-cache",
  });

  // Receive auth token
  if (res.data.authenticate) tokenVar(res.data.authenticate);
  else return res.errors;
}

export async function logout() {
  tokenVar("");
}

// User creation function
export async function createAccount(
  name: string,
  username: string,
  email: string,
  password: string
) {
  // Query the backend
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

  // Receive auth token
  if (res.data?.createUser) {
    tokenVar(res.data.createUser);
    console.log(
      "Created user with authorization token",
      res.data?.createUser,
      tokenVar()
    );
  } else return res.errors;
}

export async function fetchUser() {
  var res = await client.query({
    query: CURRENT_USER,
  });
  return res.data?.currentUser;
}
