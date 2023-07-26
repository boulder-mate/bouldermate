import React from "react";
import { useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";

import { View, StyleSheet, Text, Pressable } from "react-native";

export const FacebookLoginButton = ({ onPress }: FacebookLoginButtonProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  return (
    <Pressable
      style={
        isPressed
          ? styles.facebookLoginButtonStylePressed
          : styles.facebookLoginButtonStyle
      }
      onPress={onPress}
      onPressIn={() => {
        setIsPressed(true);
      }}
      onPressOut={() => {
        setIsPressed(false);
      }}
    >
      <View style={styles.contentContainer}>
        <Icon
          style={isPressed ? styles.iconPressed : styles.icon}
          name="logo-facebook"
          size={25}
        />
        <Text style={isPressed ? styles.textPressed : styles.text}>
          Login With Facebook
        </Text>
      </View>
    </Pressable>
  );
};

type FacebookLoginButtonProps = {
  onPress: any;
};

const styles = StyleSheet.create({
  facebookLoginButtonStyle: {
    backgroundColor: "#4267B2",
    width: 350,
    maxWidth: "100%",
    height: 44,
    borderRadius: 5,
    marginBottom: 10,
  },
  facebookLoginButtonStylePressed: {
    backgroundColor: "#20438c",
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
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  textPressed: {
    width: "100%",
    textAlign: "center",
    flex: 2,
    color: "#c8c8c8",
    fontWeight: "bold",
    fontSize: 16,
  },
  icon: {
    color: "white",
    marginLeft: 2,
  },
  iconPressed: {
    color: "#c8c8c8",
    marginLeft: 2,
  },
  contentContainer: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
  },
});
