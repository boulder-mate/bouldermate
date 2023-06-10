import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
const Boulder = require("../assets/images/bouldering.jpg");
const Rope = require("../assets/images/rope.jpeg");
const LinearGradient = require("expo-linear-gradient").default;

const MUTUAL_BR = 20;

export const Projects = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <LinearGradient colors={["white", "transparent"]} style={{ flex: 1 }}>
          <ImageBackground
            source={Boulder}
            style={[styles.imageFit, { height: "100%", width: "100%" }]}
            resizeMode="cover"
          />
        </LinearGradient>
      </View>
      <View style={styles.section}>
        <ImageBackground
          source={Rope}
          style={[styles.imageFit, { height: "100%", width: "100%" }]}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: 380,
    height: 200,
    backgroundColor: "white",
    borderWidth: 0.5,

    marginTop: 17,
    borderColor: "black",
    borderRadius: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
  },
  imageFit: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "red",
  },
});
