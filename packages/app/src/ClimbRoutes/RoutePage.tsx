import { Route } from "common";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { CameraScreen } from "../Utils/Camera";

let width = Dimensions.get("screen").width;

var wallImage = require("../../assets/images/wall-image.jpg");
export const RoutePage = () => {
  return (
    <View>
      <ImageBackground
        source={wallImage}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Name</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  imageContainer: {
    alignContent: "center",
  },
  image: {
    height: 250,
    width,
  },
  title: {
    color: "black",
    fontFamily: "Lexend",
    fontSize: 20,
    
  },
  titleContainer: {
    backgroundColor: "white",
    marginTop: "auto",
    borderTopRightRadius: 20,
    alignSelf: "flex-start",
    marginRight: 10,
    padding: 10,
  }
});
