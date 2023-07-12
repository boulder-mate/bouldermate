import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Keyboard,
  TouchableHighlight,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";

import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RouteCamera } from "./RouteCamera";

import { EXPANDED_IMG_HEIGHT, CARD_IMG_HEIGHT } from "../RoutePageHeader";
import { UploadMetadata } from "./UploadMetadata";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons } from "../HeaderButtons";

let height = Dimensions.get("screen").height;

export const RouteUpload = () => {
  const [metadata, updateMetadata] = useState<any>({});
  // Infer the gym, route type and one routesetter
  const [header, updateHeader] = useState<any>({});

  const navigation = useNavigation<any>();

  const stateToRoute = () => {
    // Kills two birds with one stone:
    // Merges all the data to send to the backend
    // Ensures scale and grade are always mutually selected on behalf of the backend
    let grades = undefined;
    if (metadata.scale && metadata.grade) {
      grades = {
        routesetter: { scale: metadata.scale, value: metadata.grade },
      };
    }
    return {
      ...header,
      ...metadata,
      scale: undefined,
      grade: undefined,
      active: true,
      created: new Date().toISOString(),
      grades,
    };
  };

  console.log("\n");
  console.log("Header:", header);
  console.log("Metadata:", metadata);

  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <LinearGradient start={{ x: 0.5, y: 0.5 }} colors={["#FFF", "#EEE"]}>
          <UploadHeader
            header={header}
            updateHeader={updateHeader}
            onPreview={() => {
              // First, validate
              let route = stateToRoute();
              let valResponse = ValidateInput(route);

              if (valResponse) {
                Alert.alert("Whoops!", valResponse);
                return;
              } else {
                navigation.setOptions();
                navigation.navigate("RoutePage", {
                  route,
                  headerButton: HeaderButtons.Upload,
                });
              }
            }}
          />
          <UploadMetadata metadata={metadata} updateMetadata={updateMetadata} />
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const UploadHeader = ({ header, updateHeader, onPreview }) => {
  const [expanded, updateExpanded] = useState(false);
  const [addingImg, updateAddingImg] = useState(false);

  if (header.image) {
    var imageBody = (
      <TouchableHighlight onPress={() => updateExpanded(!expanded)}>
        <ImageBackground
          source={{ uri: header.image }}
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
          <TouchableHighlight
            style={styles.retake}
            onPress={() => {
              updateHeader({ ...header, image: null });
              updateAddingImg(true);
            }}
          >
            <View style={styles.retakeContainer}>
              <Text style={styles.retakeText}>Retake</Text>
              <FontAwesome name="refresh" size={15} color="white" />
            </View>
          </TouchableHighlight>
        </ImageBackground>
      </TouchableHighlight>
    );
  } else if (addingImg) {
    var imageBody = (
      <RouteCamera
        height={EXPANDED_IMG_HEIGHT}
        onCapture={(imgURI) => {
          console.log("Updating header");
          updateHeader({ ...header, image: imgURI });
        }}
      />
    );
  } else {
    var imageBody = (
      <TouchableHighlight onPress={() => updateAddingImg(true)}>
        <View
          style={[
            styles.addPhoto,
            { height: expanded ? EXPANDED_IMG_HEIGHT : CARD_IMG_HEIGHT },
          ]}
        >
          <FontAwesome name="camera" color="#EEE" size={35} />
          <Text style={{ color: "#EEE", fontSize: 20 }}>Add Image</Text>
        </View>
      </TouchableHighlight>
    );
  }

  return (
    <View>
      {imageBody}

      <View style={styles.summaryContainer}>
        <View style={styles.summary}>
          <TextInput
            style={styles.title}
            numberOfLines={1}
            placeholder="Route Name"
            allowFontScaling={false}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={(text) => updateHeader({ ...header, name: text })}
          />
        </View>
        <TouchableHighlight style={styles.preview} onPress={onPreview}>
          <Text style={styles.previewText}>
            Preview <Entypo name="chevron-right" size={16} />
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const ValidateInput = (route) => {
  // Returns text indicating missing fields or empty string if satisfied
  var missing = [];
  !route.gym && missing.push("select a gym");
  !route.image && missing.push("upload an image");
  !route.name && missing.push("choose a name");
  !route.colors?.length && missing.push("select at least one color");
  !route.routesetters?.length &&
    missing.push("select at least one routesetter");
  !route.type && missing.push("select a route type");

  console.log(missing);
  console.log(missing.slice(0, -1));

  if (missing.length === 0) return "";
  else if (missing.length === 1) return "Please " + missing[0] + ".";
  else {
    // Form a proper sentences
    return (
      "Please " +
      missing.slice(0, -1).join(", ") +
      " and " +
      missing[missing.length - 1] +
      "."
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    overflow: "scroll",
    height,
  },
  metadataContainer: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    gap: 17,
    flexDirection: "column",
    alignContent: "space-between",
    overflow: "scroll",
  },
  imageContainer: {
    alignContent: "center",
  },
  addPhoto: {
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
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
    padding: 5,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 5,
  },
  retake: {
    backgroundColor: "#333",
    position: "absolute",
    top: 5,
    left: 5,
    padding: 5,
    borderRadius: 5,
    width: 85,
    alignItems: "center",
    borderWidth: 1,
    opacity: 0.9,
  },
  retakeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  retakeText: {
    fontSize: 15,
    color: "white",
    fontFamily: "Lexend",
  },
  summaryContainer: {
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
  summary: {
    flexDirection: "column",
    flex: 1,
    marginRight: 15,
  },
  preview: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#2222ee",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    height: 40,
    width: 120,
    alignItems: "center",
  },
  previewText: {
    marginTop: 4,
    fontSize: 15,
    fontFamily: "Lexend",
    color: "white",
  },
});
