import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
import { LogoScreen } from "./src/Logo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Friends } from "./src/Friends/FriendsStack";
import { Projects } from "./src/Projects/ProjectsStack";
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
          initialRouteName="Projects"
          id="BottomTab"
          backBehavior="history"
          tabBar={(props) => <TabBar {...props} />}
        >
          <Tab.Screen name="Gyms" component={Gyms} options={{headerShown: false}}/>
          <Tab.Screen name="Friends" component={Friends} options={{headerShown: false}}/>
          <Tab.Screen name="Projects" component={Projects}  options={{headerShown: false}}/>
          <Tab.Screen name="Me" component={Profile} options={{headerShown: false}} />
          <Tab.Screen name="Settings" component={Settings} options={{headerShown: false}} />
          
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}



