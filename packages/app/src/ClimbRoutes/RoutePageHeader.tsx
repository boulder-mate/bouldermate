import { Route } from "common";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import { ColorDisplay } from "./Uploads/UploadMetadata";

var wallImage = require("../../assets/images/wall-image.jpg");

export const EXPANDED_IMG_HEIGHT = 550;
export const CARD_IMG_HEIGHT = 220;

// Pass in the route and children, which will be an element apart of HeaderButtons
export const RoutePageHeader = ({ route, children }) => {
  const [expanded, updateExpanded] = useState(false);

  return (
    <View>
      <TouchableHighlight onPress={() => updateExpanded(!expanded)}>
        <ImageBackground
          source={{ uri: route.image }}
          resizeMode="cover"
          style={{ height: expanded ? EXPANDED_IMG_HEIGHT : CARD_IMG_HEIGHT }}
          imageStyle={styles.imageContainer}
        >
          <View style={styles.expandButton}>
            {expanded ? (
              <AntDesign size={20} name="shrink" color={"white"} />
            ) : (
              <AntDesign size={20} name="arrowsalt" color={"white"} />
            )}
          </View>
        </ImageBackground>
      </TouchableHighlight>
      <View style={styles.aboutContainer}>
        <View style={styles.about}>
          <Text
            style={styles.title}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          >
            {route.name}
          </Text>
          <View style={styles.desc}>
            <Text style={styles.descText}>{route.colors.join("/")}</Text>
            <ColorDisplay colors={route.colors} size={14} />
            {route.ratings && <Text style={styles.descText}>4.71</Text>}
            {route.ratings && route.grades && (
              <Octicons name="dot-fill" style={styles.dots} />
            )}
            {route.grades && (
              <Text style={styles.descText}>
                Grade {route.grades.routesetter.value}
              </Text>
            )}
          </View>
        </View>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignContent: "center",
  },
  expandButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    width: 30,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: 5,
    marginTop: 5,
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
    height: 75,
    marginTop: "auto",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "black",
    flexDirection: "row",
  },
  about: {
    flexDirection: "column",
    flex: 1,
    marginRight: 15,
  },
  desc: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  descText: {
    fontFamily: "Lexend",
    textAlignVertical: "center",
    fontSize: 15,
  },
  dots: {
    alignSelf: "center",
    marginTop: 3,
  },
});
