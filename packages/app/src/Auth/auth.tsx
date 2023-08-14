import { useState, useEffect, createContext } from "react";
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
