import React from "react";
import "expo-dev-client";
import { View, Dimensions, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/Apollo/apollo";

import { Friends } from "./src/Friends/FriendsStack";
import { Projects } from "./src/Projects/ProjectsStack";
import { Gyms } from "./src/Gyms/Gyms";
import { TabBar } from "./src/TabBar/TabBar";
import { Settings } from "./src/Settings/Settings";
import { Profile } from "./src/Profile/Profile";

import { NavigationContainer, Theme } from "@react-navigation/native";
import { AuthProvider } from "./src/Auth/Auth";

const { width, height } = Dimensions.get("window");

export const appTheme: Theme = {
  dark: false,
  colors: {
    primary: "rgb(0, 122, 255)",
    background: "#EEE",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)",
  },
};

export default function App() {
  let [loaded] = useFonts({
    Lexend: require("./assets/fonts/Lexend/Lexend-VariableFont_wght.ttf"),
    LexendThin: require("./assets/fonts/Lexend/static/Lexend-Light.ttf"),
    LexendSemibold: require("./assets/fonts/Lexend/static/Lexend-SemiBold.ttf"),
    LexendBold: require("./assets/fonts/Lexend/static/Lexend-ExtraBold.ttf"),
  });

  if (!loaded) return null;

  StatusBar.setBarStyle("dark-content");

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer theme={appTheme}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <View
            style={{
              width,
              height: height,
            }}
          >
            <Tab.Navigator
              initialRouteName="Projects"
              id="BottomTab"
              screenOptions={{
                tabBarHideOnKeyboard: true,
              }}
              backBehavior="none"
              tabBar={(props) => <TabBar {...props} />}
            >
              <Tab.Screen
                name="Gyms"
                component={Gyms}
                options={{ headerShown: false }}
              />
              <Tab.Screen
                name="Friends"
                component={Friends}
                options={{ headerShown: false }}
              />
              <Tab.Screen
                name="Projects"
                component={Projects}
                options={{ headerShown: false }}
              />
              <Tab.Screen
                name="Me"
                component={Profile}
                options={{ headerShown: false }}
              />
              <Tab.Screen
                name="Settings"
                component={Settings}
                options={{ headerShown: false }}
              />
            </Tab.Navigator>
          </View>
        </AuthProvider>
      </ApolloProvider>
    </NavigationContainer>
  );
}
