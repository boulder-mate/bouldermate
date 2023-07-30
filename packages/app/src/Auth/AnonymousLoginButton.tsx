import React from "react";
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { View, StyleSheet, Text, TouchableHighlight } from "react-native";

export const AnonymousLoginButton = ({ onPress }) => {
  return (
    <TouchableHighlight
      style={styles.anonLoginButtonStylePressed}
      onPress={onPress}
    >
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="incognito-circle"
          size={25}
        />
        <Text style={styles.text}>Quick Login (Anonymous)</Text>
      </View>
    </TouchableHighlight>
  );
};

type AnonLoginButtonProps = {
  onPress: any;
};

const styles = StyleSheet.create({
  anonLoginButtonStyle: {
    backgroundColor: "white",
    width: 350,
    maxWidth: "100%",
    height: 44,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#AAA",
    borderWidth: 0.5,
  },
  anonLoginButtonStylePressed: {
    backgroundColor: "white",
    width: 350,
    maxWidth: "100%",
    height: 44,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#AAA",
    borderWidth: 0.5,
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
