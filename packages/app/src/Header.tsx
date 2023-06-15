// Each stack attached to bottom tab pages technically has it's own header
// This is to enable stack based use of the back button
// Hence this file contains functions which return a header dynamic to each stack

import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export function stackHeader(isLanding: boolean = false) {
    const navigation = useNavigation<any>();
    return {
        title: "BoulderMate",
        headerTitleStyle: headerStyles.title,
        headerLeft: isLanding ? null : () => (
        <MaterialIcons name="arrow-back-ios" size={25} style={headerStyles.back} onPress={() => navigation.goBack()}/>
        ),
    };
}

const headerStyles = StyleSheet.create({
    title: {
      color: "#FF3131",
      fontFamily: "LexendBold",
      fontSize: 27,
      marginBottom: 5,
      textShadowColor: "rgba(0, 0, 0, 1)",
      textShadowOffset: { width: -0.5, height: 0.5 },
      textShadowRadius: 0,
    },
    back: {
      marginLeft: 15,
    },
  });