import { useState, useEffect, createContext, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserProvider, AppProvider, useUser } from "@realm/react";
import { AuthLanding, AuthStack } from "./LoginHome";
import { getAsyncData, storeAsyncData } from "../Utils/AsyncStorage";
import { LoadingScreen } from "../Utils/MiscComponents";

import env from "../envManager";

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userFetched, setUserFetched] = useState(false);

  // Query user data on startup
  useEffect(() => {
    getAsyncData("user_id").then((result) => {
      console.log("Retrieved user_id as", result);
      setUserId(result);
      setUserFetched(true);
    });
  }, []);

  if (!userFetched) {
    return <LoadingScreen text="Fetching your user data..." />;
  }

  return (
    <AppProvider id={env.MONGO_APP_ID as any as string}>
      <UserProvider fallback={<AuthStack />}>{children}</UserProvider>
    </AppProvider>
  );
};

// Here we integrate Mongo auth tokens with GraphQL
const AuthContext = createContext(null);

export function ProvideAuth({ children }) {
  return (
    <AuthContext.Provider value={useProvideAuth()}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthData = () => {
  return useContext(AuthContext);
};

export function useProvideAuth() {
  const [userData, updateUserData] = useState({});

  // async function fetchUser() {
  //   try {
  //     /*
  //      *  anything here will run once everytime the hook is called, so
  //      *  please handle with care, it is ok that client.query is called
  //      *  once for each location card, as gql client only fetches once :)
  //      */
  //     updateUser({
  //       ...user,
  //       loading: true,
  //     });
  //     const result = await client.query({
  //       query: CURRENT_USER,
  //       fetchPolicy: "no-cache",
  //     });
  //     var data = result?.data?.current_user;
  //     updateUser({
  //       ...user,
  //       ...data,
  //       loading: false,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  useEffect(() => {
    // fetchUser();
    // Firebase.auth().onIdTokenChanged(() => sleep().then((x) => fetchUser()));
  }, []);

  return userData;
}

function sleep(ms = 100) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
