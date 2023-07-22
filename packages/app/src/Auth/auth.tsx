import React from "react";
import { View, Text } from "react-native";
import { useApp, UserProvider, AppProvider } from "@realm/react";
import Realm from "realm";

export const AuthProvider = ({ children }) => {
  return (
    <View>
      <AppProvider id={process.env.MONGO_APP_ID}>
        <UserProvider fallback={<RegisterUser />}>{children}</UserProvider>
      </AppProvider>
    </View>
  );
};

const RegisterUser = () => {
  const app = useApp();
  async function register(email: string, password: string) {
    // Register new email/password user
    await app.emailPasswordAuth.registerUser({ email, password });
    // Log in the email/password user
    await app.logIn(Realm.Credentials.emailPassword(email, password));
  }

  // UI for user registration

  return (
    <View>
      <Text>REGISTER</Text>
    </View>
  );
};
