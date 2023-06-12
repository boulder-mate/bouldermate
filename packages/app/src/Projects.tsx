import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Boulder = require("../assets/images/bouldering.jpg");
const Rope = require("../assets/images/lead.jpg");

const MUTUAL_BR = 20;

enum ClimbPreference {
  Rope,
  Boulder,
}

export const Projects = () => {
  var [ropePress, setRopePress] = useState(false);
  var [boulderPress, setBoulderPress] = useState(false);
  var [lastPress, setLastPress] = useState(ClimbPreference.Boulder);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={[
          styles.section,
          { borderWidth: ropePress ? 1.5 : 1, borderColor: "black" },
        ]}
        onPressIn={() => {
          setRopePress(true)
          setLastPress(ClimbPreference.Rope)
        }}
        onPressOut={() => setRopePress(false)}
      >
        <ImageBackground
          source={Rope}
          style={styles.imageFit}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0.35, y: 0.4 }}
            colors={
              lastPress === ClimbPreference.Rope
                ? ["rgba(255,255,255,0.2)", "white"]
                : ["rgba(255,49,49,0.1)", "rgba(255, 49, 49, 0.9)"]
            }
            style={{ flex: 1, borderRadius: MUTUAL_BR }}
          >
            <Text
              style={[
                styles.text,
                { color: lastPress === ClimbPreference.Rope ? "rgba(255, 49, 49, 1)" : "white" },
              ]}
            >
              Rope Projects
            </Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.section}
        onPressIn={() => {
          setRopePress(true)
          setLastPress(ClimbPreference.Boulder)
        }}
        onPressOut={() => setBoulderPress(false)}
      >
        <ImageBackground
          source={Boulder}
          style={styles.imageFit}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0.35, y: 0.4 }}
            colors={
              lastPress === ClimbPreference.Boulder
              ? ["rgba(255,255,255,0.2)", "white"]
              : ["rgba(255,49,49,0.1)", "rgba(255, 49, 49, 0.9)"]
            }
            style={{ flex: 1, borderRadius: MUTUAL_BR }}
          >
            <Text
              style={[
                styles.text,
                { color: lastPress === ClimbPreference.Boulder ? "rgba(255, 49, 49, 1)" : "white" },
              ]}
            >
              Boulder Projects
            </Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableHighlight>
    </View>
  );
};

// These are for prolonged storage of climbing preferences - a small but nice perso
async function setClimbPreference(value) {
  try {
    await AsyncStorage.setItem('climb_preference', value)
  } catch(e) {
    console.log("Error saving climbing preference")
    // save error
  }
  console.log('Saved climbing preference as', value)
}

async function getClimbPreference(value) {
  try {
    return await AsyncStorage.getItem('climb_preference')
  } catch(e) {
    console.log("Error retrieving climbing preference")
    // save error
  }
  console.log('Retrieved climbing preference as', value)
}

const styles = StyleSheet.create({
  section: {
    width: 380,
    height: 200,
    backgroundColor: "white",
    borderWidth: 1,
    marginTop: 17,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
  },
  imageFit: {
    borderRadius: 20,
    overflow: "hidden",
    height: "100%", 
    width: "100%"
  },
  text: {
    color: "white",
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: 15,
    marginRight: 20,
    fontSize: 20,
    fontFamily: "LexendBold",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#BBB",
  },
});
