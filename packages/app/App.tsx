import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
import { LogoScreen } from "./src/Logo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Friends } from "./src/Friends";
import { Projects } from "./src/Projects";
import { Scanner } from "./src/Scanner";
import { TabBar } from "./src/TabBar/TabBar";
import { Settings } from "./src/Settings";

import {
  NavigationContainer,
} from "@react-navigation/native";
import { Search } from "./src/Search";

export default function App() {
  let [loaded] = useFonts({
    Lexend: require("./assets/fonts/Lexend/Lexend-VariableFont_wght.ttf"),
    LexendBold: require("./assets/fonts/Lexend/static/Lexend-ExtraBold.ttf"),
  });

  if (!loaded) return null;

  const Tab = createBottomTabNavigator();
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          id="BottomTab"
          backBehavior="history"
          tabBar={(props) => <TabBar {...props} />}
        >
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="Friends" component={Friends} />
          <Tab.Screen name="Projects" component={Projects} />
          <Tab.Screen name="Scanner" component={Scanner} />
          
          <Tab.Screen name="Settings" component={Settings} />
          
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
