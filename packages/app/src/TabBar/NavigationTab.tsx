import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Climber = require("../../assets/images/climber.png");
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const NavigationTab = ({ route, isFocused }) => {
  const renderIcon = (route: string, isFocused: boolean) => {
    switch (route) {
      case "Projects":
        return (
          <View
            style={{ padding: 5, backgroundColor: "#FF3131", borderRadius: 25, borderWidth: isFocused ? 0.9 : 0 }}
          >
            <Image
              source={Climber}
              style={{
                height: 40,
                width: 40,
              }}
            />
          </View>
        );
      case "Friends":
        return <FontAwesome5 name={"user-friends"} size={25} />;
      case "Scanner":
        return <AntDesign name={"scan1"} size={30} />;
      case "Search":
        return <AntDesign name={"search1"} size={25} />;
      case "Settings":
        return <Ionicons name="settings-sharp" size={25} />;
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

const styles = StyleSheet.create({});

export default NavigationTab;
