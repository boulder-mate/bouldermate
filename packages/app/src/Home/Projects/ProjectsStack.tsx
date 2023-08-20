import { createStackNavigator } from "@react-navigation/stack";
import { ProjectsLanding } from "./Projects";
import { Ropes } from "./RopeProjects";
import { Boulders } from "./BoulderProjects";

export const ProjectsStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={ProjectsLanding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyRopes"
        component={Ropes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyBoulders"
        component={Boulders}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
