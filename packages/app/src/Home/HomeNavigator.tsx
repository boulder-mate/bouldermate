import { ProjectsStack } from "./Projects/ProjectsStack";
import { ActivityStack } from "./Activity/ActivityStack";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ProgressStack } from "./Progress/ProgressStack";
import { TopTabBar } from "./TopTabBar";
import { useState } from "react";

export const HomeNavigator = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Projects"
      tabBar={(props) => <TopTabBar {...props} onBack={undefined} />}
    >
      <Tab.Screen
        name="Progress"
        component={ProgressStack}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsStack}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityStack}
      />
    </Tab.Navigator>
  );
};
