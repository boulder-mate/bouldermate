import { stackHeader } from "../Header";

import { createStackNavigator } from "@react-navigation/stack";
import { HomeLanding } from "./HomeLanding";
import { TabNavigator } from "./TabNavigator";
import { RouteTypes } from "../constants/RouteTypes";

export const HomeNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={HomeLanding}
        options={stackHeader(true)}
      />
      <Stack.Screen
        name="MyRopes"
        component={TabNavigator}
        options={stackHeader()}
        initialParams={{ type: RouteTypes.Rope }}
      />
      <Stack.Screen
        name="MyBoulders"
        component={TabNavigator}
        options={stackHeader()}
        initialParams={{ type: RouteTypes.Boulder }}
      />
    </Stack.Navigator>
  );
};
