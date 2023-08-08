import { useApp } from "@realm/react";
import { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Logo } from "../Logo";
import { FacebookLoginButton } from "./LoginButtons/FacebookLoginButton";
import { RegisterButton } from "./LoginButtons/RegisterButton";
import { GoogleLoginButton } from "./LoginButtons/GoogleLoginButton";
import { AppleLoginButton } from "./LoginButtons/AppleLoginButton";
import { BouldermateLoginButton } from "./LoginButtons/ExistingUserLoginButton";
import { LoginTemplate } from "./LoginTemplate";
import { createStackNavigator } from "@react-navigation/stack";
import { UserLogin } from "./LoginUser";
import {
  createNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { Register } from "./Register";

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
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

export const AuthLanding = () => {
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
    <View style={styles.pageContainer}>
      <View style={styles.buttonContainer}>
        <BouldermateLoginButton
          onPress={() => navigation.navigate("LoginUser")}
        />
        <GoogleLoginButton onPress={() => console.log("Google selected!")} />

        <FacebookLoginButton
          onPress={() => console.log("Facebook selected!")}
        />
        <AppleLoginButton
          setAppleResponse={undefined}
          setLoading={undefined}
          setErrorMessage={undefined}
        />
      </View>
      <Text style={{ fontFamily: "Lexend", marginVertical: 10, fontSize: 15 }}>
        - or -
      </Text>
      <RegisterButton onPress={() => navigation.navigate("Register")} />
      <Text style={styles.registerGym}>I want to register a gym</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    gap: 5,
  },
  pageContainer: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  registerGym: {
    textDecorationLine: "underline",
    opacity: 0.75,
    position: "absolute",
    bottom: 50,
    marginTop: 10,
  },
});
