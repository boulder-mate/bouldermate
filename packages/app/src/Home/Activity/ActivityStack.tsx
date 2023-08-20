import { createStackNavigator } from "@react-navigation/stack";

import { stackHeader } from "../../Header";
import { Activity } from "./Activity";
import { useEffect } from "react";

export const ActivityStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Activity">
      <Stack.Screen
        name="Activity"
        component={Activity}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
