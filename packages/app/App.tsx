import { StyleSheet, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
import { LogoScreen } from "./src/Logo";
import { createMaterialBottomTabNavigator  } from "@react-navigation/material-bottom-tabs";
import { Friends } from "./src/Friends";
import { Home } from "./src/Home";
import { Search } from "./src/Search";

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

  const Tab = createMaterialBottomTabNavigator ();
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home" id="BottomTab" backBehavior="history" shifting={false} activeColor="#FF3131">
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Friends" component={Friends} />
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
