import { useApp } from "@realm/react";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Logo } from "../Logo";
import { FacebookLoginButton } from "./FacebookLoginButton";
import { AnonymousLoginButton } from "./AnonymousLoginButton";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { AppleLoginButton } from "./AppleLoginButton";
import { BouldermateLoginButton } from "./ExistingUserLoginButton";
import { LoginTemplate } from "./LoginTemplate";
import { createStackNavigator } from "@react-navigation/stack";
import { UserLogin } from "./LoginUser";
import {
  createNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";

export const AuthStack = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator
      initialRouteName="AuthLanding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="AuthLanding" component={AuthLanding} />
      <AuthStack.Screen name="LoginUser" component={UserLogin} />
    </AuthStack.Navigator>
  );
};

export const AuthLanding = () => {
  console.log("IN AUTH LANDIGN");
  return (
    <LoginTemplate text={"Choose your sign in method"}>
      <LoginSelection />
    </LoginTemplate>
  );
};

const LoginSelection = () => {
  const app = useApp();

  const navigation = useNavigation<any>();

  // Anonymous login
  async function anonymousLogin() {
    await app.logIn(Realm.Credentials.anonymous());
  }

  return (
    <>
      <View style={styles.buttonContainer}>
        <BouldermateLoginButton
          onPress={() => navigation.navigate("LoginUser")}
        />
        <AppleLoginButton
          setAppleResponse={undefined}
          setLoading={undefined}
          setErrorMessage={undefined}
        />
        <GoogleLoginButton onPress={() => console.log("Google selected!")} />

        <FacebookLoginButton
          onPress={() => console.log("Facebook selected!")}
        />
      </View>
      <Text style={{ fontFamily: "Lexend", marginBottom: 10 }}>- or -</Text>
      <AnonymousLoginButton onPress={() => anonymousLogin()} />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    gap: 5,
  },
});
