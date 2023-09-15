// Each stack attached to bottom tab pages technically has it's own header
// This is to enable stack based use of the back button
// Hence this file contains functions which return a header dynamic to each stack

import { Pressable, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export function stackHeader(isLanding: boolean = false) {
  const navigation = useNavigation<any>();
  return {
    title: "BoulderMate",
    headerTitleAlign: "center" as "center" | "left",
    headerTitleStyle: headerStyles.title,
    headerStyle: headerStyles.header,
    headerLeft: isLanding
      ? null
      : () => (
          <MaterialIcons
            name="arrow-back-ios"
            size={25}
            onPress={() => navigation.goBack()}
            style={headerStyles.back}
          />
        ),
  };
}

export function mapHeader() {
  return {
    title: "BoulderMate",
    headerTitleAlign: "center" as "center" | "left",
    headerTitleStyle: headerStyles.title,
    headerStyle: headerStyles.header,
  };
}

export function defaultTabHeader() {
  return {
    headerShown: false,
    tabBarHideOnKeyboard: true,
  };
}

const headerStyles = StyleSheet.create({
  header: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#AAA",
  },
  title: {
    color: "red",
    fontFamily: "LexendBold",
    fontSize: 25,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 0,
  },
  back: {
    marginLeft: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 1,
  },
});
