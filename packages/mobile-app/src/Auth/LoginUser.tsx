import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Alert,
} from "react-native";
import { LoginTemplate } from "./LoginTemplate";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import * as Progress from "react-native-progress";
import { authorize } from "./Utils";

export const UserLogin = (args) => {
  const [user, updateUser] = useState(""); // This is email or username!
  const [password, updatePassword] = useState("");
  const [loading, updateLoading] = useState(false);

  const updateToken = args.route.params.updateToken;

  async function login() {
    // BoulderMate account register function
    updateLoading(true);

    // Log in the email/password user
    var token = await authorize(user, password);

    // Update the global token (will be null if authorization failed)
    updateToken(token);

    updateLoading(false);
  }

  return (
    <LoginTemplate text="Enter your account details">
      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <FontAwesome5Icon
            name={"user-alt"}
            size={18}
            style={{ opacity: 0.8 }}
          />
          <TextInput
            onChangeText={(text) => updateUser(text)}
            placeholder="Email or Username"
            style={styles.textField}
            placeholderTextColor={"#999"}
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>
        <View style={styles.fieldContainer}>
          <FontAwesome5Icon name={"key"} size={18} style={{ opacity: 0.8 }} />
          <TextInput
            onChangeText={(text) => updatePassword(text)}
            placeholder="Password"
            style={styles.textField}
            placeholderTextColor={"#999"}
            autoCapitalize="none"
            autoComplete="password"
          />
        </View>
        <AuthorizeButton onPress={login} loading={loading} />
      </View>
    </LoginTemplate>
  );
};

export const AuthorizeButton = ({ onPress, loading }) => {
  return (
    <TouchableHighlight style={styles.loginButton} onPress={() => onPress()}>
      {loading ? (
        <Progress.Circle color={"white"} size={25} indeterminate />
      ) : (
        <>
          <Text style={styles.loginText}>Start Climbing</Text>
          <MaterialIcons name="double-arrow" size={18} color="white" />
        </>
      )}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 15,
    width: 300,
  },
  textField: {
    fontSize: 15,
    flex: 1,
    height: 45,
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
