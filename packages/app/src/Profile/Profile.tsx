import { createStackNavigator } from "@react-navigation/stack";
import { ProfileLanding } from "./ProfileLanding";
import { stackHeader } from "../Header";
import { CommonScreens } from "../CommonStackScreens";

export const Profile = () => {
  const ProfileStack = createStackNavigator();

  return (
    <ProfileStack.Navigator initialRouteName="Landing">
      {CommonScreens(ProfileStack)}
      <ProfileStack.Screen
        name="Landing"
        component={ProfileLanding}
        options={{ ...stackHeader(true) }}
      />
    </ProfileStack.Navigator>
  );
};
