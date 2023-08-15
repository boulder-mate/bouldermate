import { View, Text, StyleSheet } from "react-native";
import { Logo } from "../Logo";

// This ideally wraps all the pages in the AuthStack
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
