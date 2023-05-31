import { StyleSheet, Text, View, Image } from "react-native";
import Logo from "../assets/images/logo-whitebg.png";

// This page was used to generate the image of the logo with the brand text

export const LogoScreen = () => {
  return (
    <View style={styles.container}>
      <BrandIcon height={280} width={380} />
      <BrandTitle size={50} />
    </View>
  );
};

export const BrandIcon = ({ width, height }) => {
  return <Image source={Logo} style={{ width, height }} />;
};

export const BrandTitle = ({ size }) => {
  return <Text style={[styles.title, { fontSize: size }]}>BoulderMate</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  image: {
    width: 380,
    height: 280,
  },
});
