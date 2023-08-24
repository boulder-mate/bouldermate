import { createStackNavigator } from "@react-navigation/stack";
import { GymsLanding } from "./GymsLanding";
import { stackHeader } from "../Header";
import { CommonScreens } from "../CommonStackScreens";

export const GymsStack = () => {
  const GymsStack = createStackNavigator();

  return (
    <GymsStack.Navigator initialRouteName="Landing">
      {CommonScreens(GymsStack)}
      <GymsStack.Screen
        name="Landing"
        component={GymsLanding}
        options={{ ...stackHeader(true) }}
      />
    </GymsStack.Navigator>
  );
};
