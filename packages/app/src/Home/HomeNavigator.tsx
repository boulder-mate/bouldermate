import { stackHeader } from "../Header";

import { createStackNavigator } from "@react-navigation/stack";
import { HomeLanding } from "./Select/SelectClimbType";
import { ClimbingStack } from "./Select/ClimbTypeStack";
import { RouteTypes } from "common";

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
        component={ClimbingStack}
        options={stackHeader()}
        initialParams={{ type: RouteTypes.Rope }}
      />
      <Stack.Screen
        name="MyBoulders"
        component={ClimbingStack}
        options={stackHeader()}
        initialParams={{ type: RouteTypes.Rope }}
      />
    </Stack.Navigator>
  );
};
