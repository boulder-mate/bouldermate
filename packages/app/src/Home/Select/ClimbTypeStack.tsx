import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Progress } from "../Progress/Progress";
import { Projects } from "../Projects/Projects";

// This stack is used as an overview by all climbing types
export const ClimbingStack = ({ routes, type }) => {
  // Query user type projects!
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Projects">
      <Tab.Screen name="Progress" component={Progress} initialParams={{}} />
      <Tab.Screen name="Projects" component={Projects} />
    </Tab.Navigator>
  );
};
