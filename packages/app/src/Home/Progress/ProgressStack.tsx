import { createStackNavigator } from "@react-navigation/stack";

import { stackHeader } from "../../Header";
import { Progress } from "./Progress";
import { useEffect } from "react";

export const ProgressStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Progress">
      <Stack.Screen
        name="Progress"
        component={Progress}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
