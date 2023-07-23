import { StyleSheet, Text, View, Image } from "react-native";
const LogoImg = require("../assets/images/logo-whitebg.png");
const LogoCreamImg = require("../assets/images/logo-creambg.png");
const LogoTransparent = require("../assets/images/logo-transparent.png");

// This page was used to generate the image of the logo with the brand text

export const LogoScreen = () => {
  return (
    <View style={brandStyles.container}>
      <Logo height={280} width={380} />
      <Title size={50} />
    </View>
  );
};

export const Logo = ({ width, height, creambg = false, transparent = false, style = {} }) => {
  var logo = LogoImg
  if (creambg) logo = LogoCreamImg
  if (transparent) logo = LogoTransparent
  return (
    <Image
      source={logo}
      style={[{ width, height }, style]}
    />
  );
};

export const Title = ({ size, text = "BoulderMate" }) => {
  return <Text style={[brandStyles.title, { fontSize: size }]}>{text}</Text>;
};

export const brandStyles = StyleSheet.create({
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
  },
});
