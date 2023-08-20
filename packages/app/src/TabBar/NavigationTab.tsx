import React from "react";
import { View, Image } from "react-native";

const Climber = require("../../assets/images/climber.png");
const Boulderer = require("../../assets/images/bouldering.png");
const Clip = require("../../assets/images/clip.png");
const Routes = require("../../assets/images/routes.png");
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const NavigationTab = ({ route, isFocused }) => {
  const renderIcon = (route: string, isFocused: boolean) => {
    switch (route) {
      case "You":
        return (
          <View
            style={{ padding: 8, borderRadius: 20, backgroundColor: "#FFF" }}
          >
            <FontAwesome5 name={"user-alt"} size={25} />
          </View>
        );
      case "Groups":
        return <FontAwesome5 name={"users"} size={25} />;
      case "Gyms":
        return <MaterialIcons name={"location-pin"} size={30} />;
      case "Routes":
        return (
          <Image
            source={Boulderer}
            style={{
              height: 28,
              width: 28,
            }}
          />
        );
      case "Settings":
        return <Ionicons name="settings-sharp" size={25} />;
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

export default NavigationTab;
