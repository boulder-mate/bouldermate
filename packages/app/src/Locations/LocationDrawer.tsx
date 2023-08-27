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

const DEFAULT_IMAGE = require("../../assets/images/wall-image.jpg");

export const LocationSummary = ({ location, bottomSheetModalRef }: any) => {
  // Close Modal if locationData is undefined
  if (!location) {
    bottomSheetModalRef.current?.close();
  }

  const navigation = useNavigation() as any;

  return (
    <View key="container" style={styles.container}>
      <View style={styles.locationTitle}>
        <Text style={styles.locationTitleText}>{location.name}</Text>
      </View>
      <View style={styles.summary}>
        <Image
          source={{
            uri: location.image ?? DEFAULT_IMAGE,
            // Default image shouldnt really be a thing. We want to enforce images for all locs
          }}
          style={styles.imageBackground}
          resizeMode="cover"
        />
      </View>
      <View>
        <Text>{location.metadata.address}</Text>
      </View>
    </View>
  );
};

// There as an option to add
// const DirectionsButton = ({ locationCoords }: any) => {
//   return (
//     <TouchableHighlight
//       style={styles.directionsButton}
//       onPress={async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status === "granted") {
//           var geolocation = await Location.getLastKnownPositionAsync();
//           var directionsAddress = `https://www.google.com/maps/dir/${geolocation?.coords.latitude},${geolocation?.coords.longitude}/${locationCoords.lat},${locationCoords.lng}`;
//           Linking.canOpenURL(directionsAddress).then((supported) => {
//             if (supported) {
//               Linking.openURL(directionsAddress);
//             } else {
//               console.log("Don't know how to open URI: " + directionsAddress);
//             }
//           });
//         } else {
//           Alert.alert(
//             "Hang on!",
//             "You need to enable location services to use this feature!"
//           );
//         }
//       }}
//     >
//       <View style={styles.directionsButtonInner}>
//         <MaterialCommunityIcons name="directions" color="#2fdce1" size={26} />
//         <Text style={styles.directionText}>Directions</Text>
//       </View>
//     </TouchableHighlight>
//   );
// };

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
    shadowColor: "#FF3131",
    shadowOffset: { width: 0.5, height: 0.1 },
    shadowOpacity: 1,
    flex: 1,
    flexDirection: "column",
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    padding: 5,
  },
  imageBackground: {
    width: "100%",
    height: 200,
    overflow: "hidden",
    alignSelf: "center",
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  summary: {
    backgroundColor: "black",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderColor: "white",
    borderWidth: 1,
  },
  locationTitle: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: "flex-start",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  locationTitleText: {
    fontFamily: "LexendBold",
    fontSize: 18,
    color: "#FF3131",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 0,
  },

  directionsButton: {
    marginLeft: "auto",
    backgroundColor: "#333",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  directionsButtonInner: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    paddingRight: 10,
  },
  directionText: {
    color: "#2fdce1",
    fontSize: 20,
  },
});
