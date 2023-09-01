import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Alert,
  Linking,
  Pressable,
  useWindowDimensions,
  ImageBackground,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const DEFAULT_IMAGE = require("../../assets/images/wall-image.jpg");
const CLIMBER = require("../../assets/images/climber.png");

export const LocationSummary = ({ location, bottomSheetModalRef }) => {
  // Close Modal if locationData is undefined
  if (!location) {
    bottomSheetModalRef.current?.close();
  }

  const navigation = useNavigation<any>();

  return (
    <View key="container" style={styles.container}>
      <LocHeader
        location={location}
        onClose={() => bottomSheetModalRef.current?.close()}
      />
      <View style={{ paddingHorizontal: 3, flexDirection: "row", height: 50 }}>
        <LocTab metric={location.routes.active.length} desc={"Routes"} />
        <LocTab metric={location.routes.active.length} desc={"Routes"} />
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

export const LocTab = ({ metric, desc }) => {
  return (
    <View
      style={{
        backgroundColor: "#FF3131",
        paddingHorizontal: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 0.5,
        borderColor: "rgba(0,0,0,0.3)",
        borderTopWidth: 0,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 18, color: "white" }}>{metric}</Text>
      <Text style={{ fontSize: 12, fontFamily: "Lexend" }}>{desc}</Text>
    </View>
  );
};

export const LocButton = ({ text, icon, onPress }) => {
  return (
    <TouchableHighlight
      style={{
        backgroundColor: "#FF3131",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        maxWidth: 500,
        flex: 1,
        alignItems: "center",
      }}
      onPress={onPress}
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
      <View style={styles.summary}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <AntDesign name="down" color={"black"} size={20} />
        </Pressable>
        <View style={styles.address}>
          <Text style={styles.addressText}>
            {location.metadata.address + ", " + location.metadata.suburb}
          </Text>
        </View>

        <View
          style={{
            borderWidth: 0.5,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
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

const DirectionsButton = ({ locationCoords }: any) => {
  return (
    <TouchableHighlight
      style={styles.directionsButton}
      onPress={async () => {
        var directionsAddress = `https://www.google.com/maps/dir/${locationCoords.lat},${locationCoords.lng}`;
        Linking.canOpenURL(directionsAddress).then((supported) => {
          if (supported) {
            Linking.openURL(directionsAddress);
          } else {
            console.log("Don't know how to open URI: " + directionsAddress);
          }
        });
      }}
    >
      <View style={styles.directionsButtonInner}>
        <MaterialCommunityIcons
          name="directions"
          color="white"
          size={45}
          style={styles.directionsButtonInner}
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  imageBackground: {
    width: "100%",
    height: 200,
    overflow: "hidden",
    alignSelf: "center",
    borderRadius: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  summary: {
    backgroundColor: "white",
    borderRadius: 0,
    borderTopRightRadius: 10,
    paddingHorizontal: 3,
    paddingTop: 3,
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
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
    color: "#FF3131",
    textShadowColor: "rgba(0, 0, 0, 1)",
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
    backgroundColor: "#FF3131",
    bottom: 0,
    left: 3,
    zIndex: 1,
    padding: 10,
    borderTopRightRadius: 10,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
  },
  addressText: {
    fontWeight: "500",
    color: "white",
    fontSize: 15,
    fontFamily: "Lexend",
  },
  directionsButton: {
    marginLeft: "auto",
    backgroundColor: "#FF3131",
    borderTopLeftRadius: 10,
    padding: 5,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  directionsButtonInner: {
    alignItems: "center",
    borderTopLeftRadius: 10,
  },
  directionText: {
    color: "white",
    fontSize: 10,
  },

  detailsContainer: {
    backgroundColor: "white",
    width: "90%",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
    alignContent: "center",
    alignSelf: "center",
    gap: 10,
    marginTop: 15,
  },

  climberIcon: {
    height: 30,
    width: 30,
    tintColor: "white",
    margin: -5,
  },
});
