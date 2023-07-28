import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserProvider, AppProvider } from "@realm/react";
import { RegisterUser } from "./Register";

import env from "../envManager";

export const AuthProvider = ({ children }) => {
  return (
    <View>
      <AppProvider id={env.MONGO_APP_ID as any as string}>
        <UserProvider fallback={<RegisterUser />}>{children}</UserProvider>
      </AppProvider>
    </View>
  );
};


