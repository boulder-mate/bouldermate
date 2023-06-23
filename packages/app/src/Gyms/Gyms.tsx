import { createStackNavigator } from "@react-navigation/stack";
import { GymsLanding } from "./GymsLanding";
import { stackHeader } from "../Header";
import { RouteUpload } from "../ClimbRoutes/RouteUpload";
import { RoutePage } from "../ClimbRoutes/RoutePage";

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
        component={RoutePage}
        options={{ ...stackHeader() }}
      />
    </GymsStack.Navigator>
  );
};
