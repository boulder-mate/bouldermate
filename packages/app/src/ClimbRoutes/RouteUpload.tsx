import { Route } from "common";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  Image,
  TouchableHighlight,
  TextInput,
} from "react-native";

import { useState } from "react";
import { RouteMetadata } from "./RouteMetadata";
import { LinearGradient } from "expo-linear-gradient";
import { RouteDiscussion } from "./RouteDiscussion";

import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

const Climber = require("../../assets/images/climber.png");
var wallImage = require("../../assets/images/wall-image.jpg");

let height = Dimensions.get("screen").height;

export const RouteUpload = () => {
  const [selected, updateSelected] = useState("Details");
  const [metadata, updateMetadata] = useState({});
  const [header, updateHeader] = useState({});

  return (
    <View style={styles.mainContainer}>
      <LinearGradient start={{ x: 0.5, y: 0.5 }} colors={["#FFF", "#EEE"]}>
        <UploadHeader header={header} updateHeader={updateHeader} />
        <UploadMetadata metadata={metadata} updateMetadata={updateMetadata} />
      </LinearGradient>
    </View>
  );
};

export const UploadHeader = ({ header, updateHeader }) => {
  const [expanded, updateExpanded] = useState(false);

  return (
    <View>
      <TouchableHighlight onPress={() => updateExpanded(!expanded)}>
        <ImageBackground
          source={wallImage}
          resizeMode="cover"
          style={{ height: expanded ? 550 : 220 }}
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
      <View style={styles.summaryContainer}>
        <View style={styles.summary}>
          <TextInput
            style={styles.title}
            numberOfLines={1}
            placeholder="Enter Name"
            allowFontScaling={false}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={(text) => updateHeader({ ...header, name: text })}
          >
            Little Green Fuckers
          </TextInput>
        </View>
        <TouchableHighlight style={styles.preview}>
          <Text style={styles.previewText}>
            Preview <Entypo name="chevron-right" size={16} />
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export const UploadMetadata = ({ metadata, updateMetadata }) => {
  return (
    <ScrollView style={{ height, overflow: "scroll" }}>
      <View style={styles.metadataContainer}>
        <MetadataField
          icon={
            <MaterialIcons
              style={{ marginRight: 2 }}
              name={"location-pin"}
              size={22}
            />
          }
          label="Gym"
          value={"Urban Climb Blackburn"}
        />
        <MetadataField
          icon={
            <Entypo
              name="tools"
              size={20}
              style={{ width: 20, marginRight: "auto" }}
            />
          }
          label="Routesetters"
          value={"Jonathon Brown, Jack Gilmore"}
        />
        <MetadataField
          icon={
            <Entypo
              name="back-in-time"
              size={20}
              style={{ width: 20, marginRight: "auto" }}
            />
          }
          label="DOB"
          value={"10th July 2023"}
        />
        <MetadataField
          icon={
            <Entypo
              name="arrow-long-up"
              size={18}
              style={{ width: 20, marginRight: "auto" }}
            />
          }
          label="Ascents"
          value={"48"}
        />
        <MetadataField
          label="Projects"
          value="573"
          icon={
            <Image
              source={Climber}
              style={{
                height: 27,
                width: 27,
              }}
            />
          }
        />
        <MetadataField
          icon={
            <FontAwesome
              name="user-secret"
              size={22}
              style={{ width: 20, marginRight: "auto" }}
            />
          }
          label="Routesetter Grade"
          value={"V7"}
        />
        <MetadataField
          icon={
            <FontAwesome
              name="users"
              size={18}
              style={{ width: 20, marginRight: "auto" }}
            />
          }
          label="Avg. User Grade"
          value="V7"
        />
        <MetadataField
          icon={
            <FontAwesome
              name="user"
              size={25}
              style={{ width: 20, marginRight: "auto" }}
            />
          }
          label="My Grade"
          value={"Add this as a project to grade this climb!"}
        />
      </View>
      <View style={{ height: 550 }} />
    </ScrollView>
  );
};

const MetadataField = ({ label, value, icon }) => {
  return (
    <View style={styles.metadataSection}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.fieldLabel}>
        <Text style={styles.fieldLabelText}>{label}</Text>
      </View>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
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
  metadataSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fieldLabel: {
    width: "40%",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  fieldLabelText: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    flexWrap: "wrap",
  },
  fieldValue: {
    flex: 1,
    flexWrap: "wrap",
  },
  icon: {
    width: "6%",
    alignItems: "center",
  },
});
