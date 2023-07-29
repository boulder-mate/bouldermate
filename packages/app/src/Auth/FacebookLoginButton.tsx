import React from "react";
import { useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";

import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableHighlight,
} from "react-native";

export const FacebookLoginButton = ({ onPress }: FacebookLoginButtonProps) => {
  return (
    <TouchableHighlight
      style={styles.facebookLoginButtonStyle}
      onPress={onPress}
    >
      <View style={styles.contentContainer}>
        <Icon style={styles.icon} name="logo-facebook" size={25} />
        <Text style={styles.text}>Login With Facebook</Text>
      </View>
    </TouchableHighlight>
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
    borderRadius: 10,
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
