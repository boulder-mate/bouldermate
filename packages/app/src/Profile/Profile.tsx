import { createStackNavigator } from "@react-navigation/stack";
import { ProfileLanding } from "./ProfileLanding";
import { stackHeader } from "../Header";
import { CommonScreens } from "../CommonStackScreens";
import { useUser } from "@realm/react";

export const Profile = () => {
  const ProfileStack = createStackNavigator();
  console.log(useUser());

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
