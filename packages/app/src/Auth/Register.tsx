import { useApp } from "@realm/react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { LoginTemplate } from "./LoginTemplate";

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

  return (
    <LoginTemplate text="Create a BoulderMate account">
      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.textField}
          onChangeText={(text) => updateEmail(text)}
        />
        <TextInput
          style={styles.textField}
          onChangeText={(text) => updatePassword(text)}
        />
      </View>
    </LoginTemplate>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    flex: 1,
  },
  textField: {
    borderRadius: 10,
    width: 250,
    height: 50,
    borderWidth: 0.5,
    borderColor: "#AAA",
    backgroundColor: "white",
  },
});
