import { useApp } from "@realm/react";
import { useState } from "react";
import { View } from "react-native";

export const Register = () => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const app = useApp();

  // BoulderMate register
  async function register(email: string, password: string) {
    // Register new email/password user
    await app.emailPasswordAuth.registerUser({ email, password });
    // Log in the email/password user
    await app.logIn(Realm.Credentials.emailPassword(email, password));
  }

  return <View></View>;
};
