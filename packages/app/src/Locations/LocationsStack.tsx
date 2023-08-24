import { createStackNavigator } from "@react-navigation/stack";
import { LocationsLanding } from "./LocationsLanding";
import { stackHeader } from "../Header";
import { CommonScreens } from "../CommonStackScreens";

export const LocationsStack = () => {
  const LocationsStack = createStackNavigator();

  return (
    <LocationsStack.Navigator initialRouteName="Landing">
      {CommonScreens(LocationsStack)}
      <LocationsStack.Screen
        name="Landing"
        component={LocationsLanding}
        options={{ ...stackHeader(true) }}
      />
    </LocationsStack.Navigator>
  );
};
