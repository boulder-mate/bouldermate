import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import Climber from "../assets/images/climber.png";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";

const NavigationIcon = ({ route, isFocused }) => {
  const renderIcon = (route: string, isFocused: boolean) => {
    switch (route) {
      case "Home":
        return <Image source={Climber} style={{ height: 40, width: 40 }} />;
      case "Friends":
        return <FontAwesome5 name={"user-friends"} size={30} />;
      case "Settings":
        return <Ionicons name={"settings-sharp"} size={30}/>
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

const styles = StyleSheet.create({});

export default NavigationIcon;
