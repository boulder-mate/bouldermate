import React from "react";
import { Logo } from "../../Logo";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
} from "react-native";

const climber = require("../../../assets/images/climber.png");

export const RegisterButton = ({ onPress }) => {
  return (
    <TouchableHighlight
      style={styles.anonLoginButtonStylePressed}
      onPress={onPress}
    >
      <View style={styles.contentContainer}>
        
        <View style={styles.imageContainer}>
          <Image source={climber} style={styles.image} />
        </View>
        <Text style={styles.text}>Create New Account</Text>
      </View>
    </TouchableHighlight>
  );
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
  image: {
    width: 27,
    height: 27,
    alignSelf: "center",
  },
  imageContainer: {
    height: 33,
    width: 33,
    position: "absolute",
    left: 10,
    borderRadius: 20,
    padding: 2,
    justifyContent: "center",
    borderColor: "black",
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
