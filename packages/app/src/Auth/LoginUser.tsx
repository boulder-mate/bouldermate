import { useApp } from "@realm/react";
import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from "react-native";
import { LoginTemplate } from "./LoginTemplate";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const UserLogin = () => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const app = useApp();

  console.log("Laods all components");

  // BoulderMate register
  async function login(email: string, password: string) {
    // Log in the email/password user
    const result = await app.logIn(
      Realm.Credentials.emailPassword(email, password)
    );
    console.log("Success?", result);
  }

  return (
    <LoginTemplate text="Enter your account details">
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.textFields}
          placeholder="Email"
          onChangeText={(text) => updateEmail(text)}
        />
        <TextInput
          style={styles.textFields}
          placeholder="Password"
          onChangeText={(text) => updateEmail(text)}
        />
        <LoginButton onPress={() => login(email, password)} />
      </View>
    </LoginTemplate>
  );
};

export const LoginButton = ({ onPress }) => {
  return (
    <TouchableHighlight style={styles.loginButton} onPress={onPress}>
      <>
        <Text style={styles.loginText}>Start Climbing</Text>
        <MaterialIcons name="double-arrow" size={18} color="white" />
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textFields: {
    backgroundColor: "white",
    borderColor: "#AAA",
    borderWidth: 0.5,
    borderRadius: 5,
    width: 275,
    paddingVertical: 2,
    paddingHorizontal: 5,
    fontSize: 16,
  },
  fieldLabel: {
    color: "red",
    fontFamily: "Lexend",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
    backgroundColor: "#FF3131",
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 5,
    height: 40,
  },
  loginText: {
    fontSize: 18,
    color: "white",
  },
});
