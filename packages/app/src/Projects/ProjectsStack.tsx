import { View, Text, StyleSheet } from "react-native";
import { Logo, Title } from "../Logo";
import { createStackNavigator } from "@react-navigation/stack";
import { ProjectsLanding } from "./Landing";
import { Ropes } from "./MyRopes";
import { Boulders } from "./MyBoulders";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const Projects = () => {
  const ProjectsStack = createStackNavigator();
  const navigation = useNavigation<any>();

  return (
    <ProjectsStack.Navigator initialRouteName="Landing">
      <ProjectsStack.Screen
        name="Landing"
        component={ProjectsLanding}
        options={{
          title: "BoulderMate",
          headerTitleStyle: headerStyles.title,
        }}
      />
      <ProjectsStack.Screen
        name="MyRopes"
        component={Ropes}
        options={{ ...header }}
      />
      <ProjectsStack.Screen
        name="MyBoulders"
        component={Boulders}
        options={{ ...header }}
      />
    </ProjectsStack.Navigator>
  );
};

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

const header = {
  title: "BoulderMate",
  headerTitleStyle: headerStyles.title,
  headerLeft: () => (
    <MaterialIcons name="arrow-back-ios" size={25} style={headerStyles.back} />
  ),
};
