import { useApp } from "@realm/react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { Logo, brandStyles } from "../Logo";
import { FacebookLoginButton } from "./FacebookLoginButton";
import { AnonymousLoginButton } from "./AnonymousLoginButton";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { AppleLoginButton } from "./AppleLoginButton";
import { BouldermateLoginButton } from "./ExistingUserLoginButton";

export const RegisterUser = () => {
  const app = useApp();
  async function register(email: string, password: string) {
    // Register new email/password user
    await app.emailPasswordAuth.registerUser({ email, password });
    // Log in the email/password user
    await app.logIn(Realm.Credentials.emailPassword(email, password));
  }

  // UI for user registration

  return (
    <View style={styles.main}>
      <Logo width={200} height={200} creambg />
      <Text style={styles.welcome}>Welcome to BoulderMate!</Text>
      <Text>Choose your sign in method</Text>
      <View style={{ height: 20 }} />

      <BouldermateLoginButton
        onPress={() => console.log("BoulderMate selected!")}
      />
      <AppleLoginButton
        setAppleResponse={undefined}
        setLoading={undefined}
        setErrorMessage={undefined}
      />
      <GoogleLoginButton onPress={() => console.log("Google selected!")} />
      <FacebookLoginButton onPress={() => console.log("Facebook selected!")} />
      <Text style={{ fontFamily: "Lexend", marginBottom: 10 }}>- or -</Text>
      <AnonymousLoginButton />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: "auto",
    paddingTop: 100,
  },
  welcome: {
    fontFamily: "LexendSemibold",
    fontSize: 20,
  },
});
