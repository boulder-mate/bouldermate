import { StyleSheet, Text, View, Image } from "react-native";
const LogoImg = require("../assets/images/logo-whitebg.png");

// This page was used to generate the image of the logo with the brand text

export const LogoScreen = () => {
  return (
    <View style={styles.container}>
      <Logo height={280} width={380} />
      <Title size={50} />
    </View>
  );
};

export const Logo = ({ width, height }) => {
  return <Image source={LogoImg} style={{ width, height }} />;
};

export const Title = ({ size }) => {
  return <Text style={[styles.title, { fontSize: size }]}>BoulderMate</Text>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FF3131",
    fontFamily: "LexendBold",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 0,
    position: "relative",
    bottom: 30,
  },
  image: {
    width: 380,
    height: 280,
  },
});
