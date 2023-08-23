import { createStackNavigator } from "@react-navigation/stack";
import { RoutesLanding } from "./Landing";
import { stackHeader } from "../Header";
import { CommonScreens } from "../CommonStackScreens";

export const RoutesStack = () => {
  const RoutesStack = createStackNavigator();

  return (
    <RoutesStack.Navigator initialRouteName="Landing">
      {CommonScreens(RoutesStack)}
      <RoutesStack.Screen
        name="Landing"
        component={RoutesLanding}
        options={{ ...stackHeader(true) }}
      />
    </RoutesStack.Navigator>
  );
};
