import { View, Text, StyleSheet, Dimensions, Keyboard } from "react-native";
import { Logo } from "../Logo";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const LoginTemplate = ({ text, children }) => {
  // UI for user login
  return (
    <View style={styles.main}>
      <Logo width={200} height={200} transparent />
      <Text style={styles.welcome}>Welcome to BoulderMate!</Text>
      <Text>{text}</Text>
      <View style={{ height: 20 }} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingVertical: "15%",
    overflow: "scroll",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    marginVertical: "auto",
  },
  welcome: {
    fontFamily: "LexendSemibold",
    fontSize: 20,
  },
});
