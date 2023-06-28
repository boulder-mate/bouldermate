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
import DropDownPicker from "react-native-dropdown-picker";
import { SliderHuePicker } from "react-native-slider-color-picker";

import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RouteCamera } from "./RouteCamera";

import { EXPANDED_IMG_HEIGHT, CARD_IMG_HEIGHT } from "./RoutePageHeader";

const Climber = require("../../assets/images/climber.png");
var wallImage = require("../../assets/images/wall-image.jpg");

let height = Dimensions.get("screen").height;

export const RouteUpload = () => {
  const [selected, updateSelected] = useState("Details");
  const [metadata, updateMetadata] = useState({});
  const [header, updateHeader] = useState({});

  console.log("\n");
  console.log("Header:", header);
  console.log("Metadata:", metadata);

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
            <Text style={styles.retakeText}>Retake</Text>
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
    <ScrollView style={{ height, overflow: "scroll" }} nestedScrollEnabled>
      <View style={styles.metadataContainer}>
        <UploadMetadataField
          icon={
            <MaterialIcons
              style={{ marginRight: 2 }}
              name={"location-pin"}
              size={22}
            />
          }
          label="Gym"
        >
          <Selector
            items={["hello", "world"]}
            value={metadata.gym}
            update={(value: any) => updateMetadata({ ...metadata, gym: value })}
          />
        </UploadMetadataField>
        <UploadMetadataField
          icon={
            <Entypo
              name="tools"
              size={20}
              style={{ width: 20, marginRight: "auto" }}
            />
          }
          label="Routesetters"
        >
          <Selector
            items={["hello", "world"]}
            multiple
            value={metadata.routesetters}
            update={(value: any) =>
              updateMetadata({ ...metadata, routsetters: value })
            }
          />
        </UploadMetadataField>
        <UploadMetadataField
          icon={
            <Ionicons
              name="square-outline"
              size={20}
              style={{ width: 20, marginRight: "auto" }}
            />
          }
          label="Colour"
        >
          <SliderHuePicker
            thumbStyle={{ backgroundColor: "black" }}
            trackStyle={{ width: 190 }}
          />
        </UploadMetadataField>
        <View style={{ height: 550 }} />
      </View>
    </ScrollView>
  );
};

const UploadMetadataField = ({ label, children, icon }) => {
  return (
    <View style={[styles.metadataSection, { zIndex: FIELD_TO_ZINDEX[label] }]}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.fieldLabel}>
        <Text style={styles.fieldLabelText}>{label}</Text>
      </View>
      <View style={[styles.fieldValue]}>{children}</View>
    </View>
  );
};

const Selector = ({ items, multiple = false, value, update }) => {
  // Items should be an array or enum
  items = items.map((x: any) => {
    return { label: x, value: x };
  });

  const [open, setOpen] = useState(false);
  // This package we use is an absolute fucking mess
  // Should consider designing own rendition in the future
  // For some reason the package requires a local copy of the value and couldnt do this internally
  const [localValue, setLocalValue] = useState(value);

  return (
    <DropDownPicker
      open={open}
      value={localValue}
      items={items}
      style={[styles.dropdown, { borderWidth: !!localValue ? 1 : 0.5 }]}
      setOpen={setOpen}
      setValue={setLocalValue} // This prop works in a dumb way - onSelectItem is used for state updates for ease of mind
      onSelectItem={
        multiple
          ? (item) => update(item.map((x) => x.value))
          : (item) => update(item.value)
      }
      listMode={"SCROLLVIEW"}
      mode="BADGE"
      badgeDotColors={["#FF3131"]}
      badgeColors={["#EEE"]}
      multiple={multiple}
    />
  );
};

const FIELD_TO_ZINDEX = {
  Gym: 5,
  Routesetters: 4,
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
    backgroundColor: "#FF3131",
    padding: 10,
    width: 75,
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: 5,
    marginRight: 5,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
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
    backgroundColor: "white",
  },
  dropdown: {
    borderColor: "black",
    height: 40,
    backgroundColor: "white",
    overflow: "scroll",
  },
  icon: {
    width: "6%",
    alignItems: "center",
  },
});
