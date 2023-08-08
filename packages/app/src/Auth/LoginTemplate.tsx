import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Logo } from "../Logo";

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
    paddingVertical: 50,
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
