import { View, StyleSheet, Text } from "react-native";
import { FacebookLoginButton } from "./LoginButtons/FacebookLoginButton";
import { RegisterButton } from "./LoginButtons/RegisterButton";
import { GoogleLoginButton } from "./LoginButtons/GoogleLoginButton";
import { AppleLoginButton } from "./LoginButtons/AppleLoginButton";
import { BouldermateLoginButton } from "./LoginButtons/ExistingUserLoginButton";
import { LoginTemplate } from "./LoginTemplate";
import { createStackNavigator } from "@react-navigation/stack";
import { UserLogin } from "./LoginUser";
import {
  useNavigation,
} from "@react-navigation/native";
import { Register } from "./Register";

// The unauthorized partition of the app necessitates its own navigation stack
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
      <LoginHome />
    </LoginTemplate>
  );
};

const LoginHome = () => {
  const navigation = useNavigation<any>();

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
    bottom: 10,
    marginTop: 10,
  },
});
