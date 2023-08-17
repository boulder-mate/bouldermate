import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { LoginTemplate } from "./LoginTemplate";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthorizeButton } from "./LoginUser";
import { createAccount } from "./Utils";

export const Register = () => {
  const [user, updateUser] = useState<any>({});
  const [loading, updateLoading] = useState(false);

  // BoulderMate account register function
  async function register() {
    updateLoading(true);

    try {
      // Create the user in the backend - using the realm ID as their doc ID
      await createAccount(user.name, user.username, user.email, user.password);
    } catch (err) {
      Alert.alert("Whoops!", err.message);
    }
    updateLoading(false);
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
              placeholder="Name"
            />
          </View>
          <View style={styles.fieldContainer}>
            <FontAwesome5Icon
              name={"user-circle"}
              size={18}
              style={{ opacity: 0.8 }}
            />
            <TextInput
              style={styles.textField}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => updateUser({ ...user, username: text })}
              placeholder="Username"
            />
          </View>
          <View style={styles.fieldContainer}>
            <MaterialIcons name={"email"} size={18} style={{ opacity: 0.8 }} />
            <TextInput
              style={styles.textField}
              autoCapitalize="none"
              onChangeText={(text) => updateUser({ ...user, email: text })}
              placeholder="Email"
            />
          </View>
          <View style={styles.fieldContainer}>
            <FontAwesome5Icon name={"key"} size={18} style={{ opacity: 0.8 }} />
            <TextInput
              style={styles.textField}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(text) => updateUser({ ...user, password: text })}
              placeholder="Password"
            />
          </View>
          <AuthorizeButton onPress={register} loading={loading} />
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
