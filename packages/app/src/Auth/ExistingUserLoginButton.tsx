import React from "react";
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { Logo } from "../Logo";
import { useApp } from "@realm/react";

export const BouldermateLoginButton = ({
  onPress,
}: BouldermateLoginButtonProps) => {
  const app = useApp()
   async function register(email: string, password: string) {
    // Register new email/password user
    await app.emailPasswordAuth.registerUser({ email, password });
    // Log in the email/password user
    await app.logIn(Realm.Credentials.emailPassword(email, password));
  }

  return (
    <TouchableHighlight
      style={styles.bouldermateLoginButtonStyle
      }
      onPress={onPress}
    >
      <View style={styles.contentContainer}>
        <Logo
          width={40}
          height={40}
          transparent
          style={{ position: "relative", right: 4 }}
        />
        <Text style={styles.text}>
          BoulderMate Login
        </Text>
      </View>
    </TouchableHighlight>
  );
};

type BouldermateLoginButtonProps = {
  onPress: any;
};

const styles = StyleSheet.create({
  bouldermateLoginButtonStyle: {
    backgroundColor: "white",
    width: 350,
    maxWidth: "100%",
    height: 44,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#AAA",
    borderWidth: 0.5,
  },
  bouldermateLoginButtonStylePressed: {
    backgroundColor: "#EEE",
    width: 350,
    maxWidth: "100%",
    height: 44,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    width: "100%",
    textAlign: "center",
    flex: 2,
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  textPressed: {
    width: "100%",
    textAlign: "center",
    flex: 2,
    fontWeight: "bold",
    fontSize: 16,
  },
  icon: {
    color: "black",
  },
  iconPressed: {
    color: "black",
  },
  contentContainer: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
  },
});
