import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
import { LogoScreen } from "./src/Logo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Friends } from "./src/Friends";
import { Home } from "./src/Home";
import { Search } from "./src/Search";
import { TabBar } from "./src/TabBar";

import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

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
          
          <Tab.Screen name="Friends" component={Friends} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Settings" component={Search} />
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
