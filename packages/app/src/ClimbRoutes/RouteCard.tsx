import { useNavigation } from "@react-navigation/native";
import { Route } from "common";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";

let wallImage = require("../../assets/images/wall-image.jpg");

export const RouteCard = () => {
  const navigator = useNavigation<any>();

  return (
    <TouchableHighlight
      onPress={() => navigator.navigate("Route")}
      style={{ borderRadius: 20 }}
    >
      <ImageBackground
        source={wallImage}
        resizeMode="cover"
        style={styles.image}
        imageStyle={styles.imageContainer}
      >
        <View style={styles.aboutContainer}>
          <View style={styles.about}>
            <Text
              style={styles.title}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
            >
              Little Green Fuckers
            </Text>
            <View style={styles.desc}>
              <Text style={styles.descText}>Green</Text>
              <Octicons name="dot-fill" style={styles.dots} />
              <Text style={styles.descText}>V7</Text>
              <Octicons name="dot-fill" style={styles.dots} />
              <Text style={styles.descText}>4.71</Text>
              <Octicons name="star-fill" style={styles.dots} />
            </View>
          </View>
          <TouchableHighlight style={styles.seeMore}>
            <View style={styles.projectText}>
              <Text style={{ fontSize: 15 }}>See More</Text>
              <Octicons size={20} name="chevron-right" />
            </View>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  image: {
    height: 295,
  },
  title: {
    color: "#FF3131",
    fontFamily: "LexendSemibold",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 0,
    overflow: "scroll",
    fontSize: 22,
  },
  aboutContainer: {
    backgroundColor: "white",
    width: "100%",
    marginTop: "auto",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
  },
  about: {
    flexDirection: "column",
    flex: 1,
    marginRight: 15,
  },
  seeMore: {
    borderColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    height: 40,
  },
  projectText: {
    marginTop: 4,
    fontFamily: "Lexend",
    flexDirection: "row",
    color: "black",
    alignItems: "center",
    textAlignVertical: "center",
    gap: 8,
  },
  desc: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  descText: {
    fontFamily: "Lexend",
    textAlignVertical: "center",
    fontSize: 15,
  },
  dots: {
    alignSelf: "center",
    marginTop: 3,
    marginHorizontal: 10,
  },
});
