import { View, Text, StyleSheet } from "react-native";
import { Logo } from "../Logo";

export const LoginTemplate = ({ text, children }) => {
  console.log("rendered!");
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
    flexDirection: "column",
    alignItems: "center",
    marginVertical: "auto",
    paddingTop: 40,
  },
  welcome: {
    fontFamily: "LexendSemibold",
    fontSize: 20,
  },
});
