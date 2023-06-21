import { createStackNavigator } from "@react-navigation/stack";
import { GymsLanding } from "./GymsLanding";
import { stackHeader } from "../Header";
import { RouteUpload } from "../ClimbRoutes/RouteUpload";

export const Gyms = () => {
  const GymsStack = createStackNavigator();

  return (
    <GymsStack.Navigator initialRouteName="Landing">
      <GymsStack.Screen
        name="Landing"
        component={GymsLanding}
        options={{ ...stackHeader(true) }}
      />
      <GymsStack.Screen
        name="RouteUpload"
        component={RouteUpload}
        options={{ ...stackHeader() }}
      />
    </GymsStack.Navigator>
  );
};
