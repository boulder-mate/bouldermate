import React from "react";
import { View, Image } from "react-native";

const Climber = require("../../assets/images/climber.png");
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const NavigationTab = ({ route, isFocused }) => {
  const renderIcon = (route: string, isFocused: boolean) => {
    switch (route) {
      case "Projects":
        return (
          <View
          
            style={{ padding: 4.5, borderRadius: 25, backgroundColor: "#FFF" }}
          >
            <Image
              source={Climber}
              style={{
                height: 45,
                width: 45,
              }}
            />
          </View>
        );
      case "Friends":
        return <FontAwesome5 name={"user-friends"} size={25} />;
      case "Gyms":
        return <MaterialIcons name={"location-pin"} size={30} />;
      case "Me":
        return <FontAwesome5 name={"user-alt"} size={25} />;
      case "Settings":
        return <Ionicons name="settings-sharp" size={25} />;
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

export default NavigationTab;
