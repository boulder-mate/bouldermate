import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
import { LogoScreen } from "./src/Logo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Friends } from "./src/Friends";
import { Projects } from "./src/Projects";
import { Gyms } from "./src/Gyms";
import { TabBar } from "./src/TabBar/TabBar";
import { Settings } from "./src/Settings";

import {
  NavigationContainer, Theme, DocumentTitleOptions
} from "@react-navigation/native";
import { Profile } from "./src/Profile";

const appTheme: Theme = {
  dark: false,
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: '#EEE',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
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
});

const header = {
  title: "BoulderMate",
  headerTitleStyle: headerStyles.title
}

export default function App() {
  let [loaded] = useFonts({
    Lexend: require("./assets/fonts/Lexend/Lexend-VariableFont_wght.ttf"),
    LexendBold: require("./assets/fonts/Lexend/static/Lexend-ExtraBold.ttf"),
  });

  if (!loaded) return null;

  const Tab = createBottomTabNavigator();
  return (
    <>
      <NavigationContainer theme={appTheme} >
        <Tab.Navigator
          initialRouteName="Home"
          id="BottomTab"
          backBehavior="history"
          
          tabBar={(props) => <TabBar {...props} />}
        >
          <Tab.Screen name="Gyms" component={Gyms} options={{...header}} />
          <Tab.Screen name="Friends" component={Friends} options={{...header}} />
          <Tab.Screen name="Projects" component={Projects} options={{...header}} />
          <Tab.Screen name="Me" component={Profile} options={{...header}} />
          <Tab.Screen name="Settings" component={Settings} options={{...header}}  />
          
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}



