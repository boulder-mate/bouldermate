import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Linking,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const DEFAULT_IMAGE = require("../../assets/images/wall-image.jpg");
const CLIMBER = require("../../assets/images/bouldering.png");

export const LocationSummary = ({ location, bottomSheetModalRef }) => {
  // Close Modal if locationData is undefined
  if (!location) {
    bottomSheetModalRef.current?.close();
  }

  const navigation = useNavigation<any>();

  const getDirections = async () => {
    var directionsAddress = `https://www.google.com/maps/dir/${location.metadata.address},${location.metadata.suburb},${location.metadata.postcode}`;
    Linking.canOpenURL(directionsAddress).then((supported) => {
      if (supported) {
        Linking.openURL(directionsAddress);
      } else {
        console.log("Don't know how to open URI: " + directionsAddress);
      }
    });
  };

  return (
    <View key="container" style={styles.container}>
      <LocHeader
        location={location}
        onClose={() => bottomSheetModalRef.current?.close()}
      />
      <View style={styles.tabsSection}>
        <LocTab metric={4.7} desc={"Avg. ★"} />
        <LocTab metric={147} desc={"Routes"} />
        <LocTab metric={452} desc={"Climbers"} />

        <LocTab
          metric={
            <MaterialCommunityIcons name="directions" color="black" size={20} />
          }
          desc={"Directions"}
          onPress={() => getDirections()}
        />
        {/* What to include for the user?
      - Climbing types at the gym
      - Average boulder rating
      - Min/max difficulty?
      - # Active Routes
      - # Total users */}
      </View>
      <View style={styles.detailsContainer}>
        <LocButton
          text={"Routes"}
          icon={<Image source={CLIMBER} style={styles.climberIcon} />}
          onPress={() => navigation.navigate("Routes")}
        />
        <LocButton
          text={"Group"}
          icon={<FontAwesome5 name="users" color="white" size={20} />}
          onPress={() => navigation.navigate("Groups")}
        />

        {/* User button options?
          Community
          Routes */}
      </View>
    </View>
  );
};

export const LocTab = ({ metric, desc = undefined, onPress = undefined }) => {
  return (
    <Pressable style={styles.tabContainer} onPress={onPress}>
      <Text style={{ fontSize: 18, color: "black", fontWeight: "700" }}>
        {metric}
      </Text>
      {desc && <Text style={{ fontSize: 12, color: "#333" }}>{desc}</Text>}
    </Pressable>
  );
};

export const LocButton = ({ text, icon, onPress }) => {
  return (
    <TouchableHighlight
      style={{
        backgroundColor: "#FF3131",
        borderColor: "white",
        borderWidth: 0.5,
        borderRadius: 10,
        height: 50,
        maxWidth: 500,
        flex: 1,
        alignItems: "center",
      }}
      onPress={() => onPress()}
    >
      <View
        style={{
          justifyContent: "center",
          padding: 5,
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        {icon}
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            fontSize: 18,
            color: "white",
            fontFamily: "LexendBold",
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export const LocHeader = ({ location, onClose }) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <AntDesign name="down" color={"black"} size={20} />
        </Pressable>
        <View style={styles.address}>
          <Text style={styles.addressText}>
            {location.metadata.address + " - " + location.metadata.suburb}
          </Text>
        </View>

        <View style={styles.imageBorder}>
          <Image
            source={{
              uri: location.image ?? DEFAULT_IMAGE,
              // Default image shouldnt really be a thing. We want to enforce images for all locs
            }}
            style={styles.imageBackground}
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
};

export const DrawerHandle = ({ title }) => {
  return (
    <View style={styles.locationTitle}>
      <Text style={styles.locationTitleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.7)",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopRightRadius: 10,
  },

  headerContainer: {
    borderRadius: 0,
    padding: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5,
    borderLeftWidth: 0,
  },
  imageBorder: {
    borderWidth: 0.5,
    borderColor: "white",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageBackground: {
    width: "100%",
    height: 200,
    overflow: "hidden",
    alignSelf: "center",
    borderRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  locationTitle: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    // These next 3 lines remove the border from image container
    position: "relative",
    top: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    shadowColor: "black",
    shadowOffset: { width: 3, height: -7 },
    shadowOpacity: 0.2,
    zIndex: 1,
  },
  locationTitleText: {
    fontFamily: "LexendBold",
    fontSize: 19,
    color: "red",
    textShadowColor: "black",
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 0,
  },

  closeButton: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "white",
    top: 10,
    right: 10,
    padding: 7,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#AAA",
    elevation: 1,
    shadowColor: "black",
    shadowOffset: { width: 2, height: -2 },
    shadowOpacity: 0.5,
  },

  address: {
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
    zIndex: 1,
    padding: 10,
    borderTopRightRadius: 10,
    borderColor: "white",
    borderBottomWidth: 0,
    borderWidth: 0.5,
  },
  addressText: {
    fontWeight: "500",
    color: "#FF3131",
    fontSize: 15,
    fontFamily: "LexendBold",
  },

  detailsContainer: {
    width: "90%",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
    alignContent: "center",
    alignSelf: "center",
    gap: 10,
    position: "absolute",
    bottom: 120,
  },
  climberIcon: {
    height: 25,
    width: 25,
    tintColor: "white",
  },

  tabsSection: {
    flexDirection: "row",
    height: 50,
    position: "relative",
    bottom: 0.5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  tabContainer: {
    paddingTop: 0.5,
    backgroundColor: "white",
    paddingHorizontal: 20,

    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 20,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderColor: "rgba(255,255,255,0.5)",
    flexDirection: "column",
    gap: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
