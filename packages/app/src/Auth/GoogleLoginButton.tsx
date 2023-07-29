import React from "react";
import { useState } from "react";
import { Image } from "react-native";
import { View, StyleSheet, Pressable, Text } from "react-native";
const logoGoogle = require("../../assets/images/logo-google-small.png");

export const GoogleLoginButton = ({ onPress }: GoogleLoginButtonProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  return (
    <Pressable
      style={
        isPressed
          ? styles.googleLoginButtonStylePressed
          : styles.googleLoginButtonStyle
      }
      onPress={onPress}
      onPressIn={() => {
        setIsPressed(true);
      }}
      onPressOut={() => {
        setIsPressed(false);
      }}
      testID="GoogleLoginButton"
    >
      <View style={styles.contentContainer}>
        <Image source={logoGoogle} style={styles.icon} />
        <Text style={styles.text}>Sign In With Google</Text>
      </View>
    </Pressable>
  );
};

type GoogleLoginButtonProps = {
  onPress: any;
};

const styles = StyleSheet.create({
  googleLoginButtonStyle: {
    backgroundColor: "white",
    width: 350,
    maxWidth: "100%",
    height: 44,
    borderRadius: 10,
    borderColor: "#AAA",
    borderWidth: 0.5,
  },
  googleLoginButtonStylePressed: {
    backgroundColor: "#c8c8c8",
    width: 350,
    maxWidth: "100%",
    height: 44,
    borderRadius: 5,
    borderColor: "#AAA",
    borderWidth: 0.5,
  },
  text: {
    width: "100%",
    textAlign: "center",
    flex: 2,
    color: "black",
    fontWeight: "600",
    fontSize: 16,
  },
  icon: {
    width: 30,
    height: 30,
  },
  contentContainer: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
  },
});
