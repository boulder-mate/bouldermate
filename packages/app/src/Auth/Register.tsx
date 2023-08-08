import { useApp } from "@realm/react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { LoginTemplate } from "./LoginTemplate";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LoginButton } from "./LoginUser";

export const Register = () => {
  const [user, updateUser] = useState({});
  const app = useApp();

  // BoulderMate register
  async function register(email: string, password: string) {
    // Register new email/password user
    await app.emailPasswordAuth.registerUser({ email, password });
    // Log in the email/password user
    await app.logIn(Realm.Credentials.emailPassword(email, password));
  }

  return (
    <LoginTemplate text="Create an account">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <FontAwesome5Icon
              name={"user-alt"}
              size={18}
              style={{ opacity: 0.8 }}
            />
            <TextInput
              style={styles.textField}
              onChangeText={(text) => updateUser({ ...user, name: text })}
              placeholder="Username"
            />
          </View>
          <View style={styles.fieldContainer}>
            <MaterialIcons name={"email"} size={18} style={{ opacity: 0.8 }} />
            <TextInput
              style={styles.textField}
              onChangeText={(text) => updateUser({ ...user, email: text })}
              placeholder="Email"
            />
          </View>
          <View style={styles.fieldContainer}>
            <FontAwesome5Icon name={"key"} size={18} style={{ opacity: 0.8 }} />
            <TextInput
              style={styles.textField}
              onChangeText={(text) => updateUser({ ...user, password: text })}
              placeholder="Password"
            />
          </View>
          <LoginButton onPress={() => console.log("Pressed")} />
        </View>
      </TouchableWithoutFeedback>
    </LoginTemplate>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 15,
    width: 300,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#FF3131",
    borderWidth: 0.5,
    height: 45,
    gap: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  register: {
    backgroundColor: "#FF3131",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  registerText: {
    fontFamily: "Lexend",
    color: "white",
    fontSize: 16,
  },
  textField: {},
});
