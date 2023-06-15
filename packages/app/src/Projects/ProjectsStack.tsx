import { createStackNavigator } from "@react-navigation/stack";
import { ProjectsLanding } from "./Landing";
import { Ropes } from "./MyRopes";
import { Boulders } from "./MyBoulders";

import { stackHeader } from "../Header";


export const Projects = () => {
  const ProjectsStack = createStackNavigator();

  return (
    <ProjectsStack.Navigator initialRouteName="Landing">
      <ProjectsStack.Screen
        name="Landing"
        component={ProjectsLanding}
        options={{...stackHeader(true)}}
      />
      <ProjectsStack.Screen
        name="MyRopes"
        component={Ropes}
        options={{...stackHeader()}}
      />
      <ProjectsStack.Screen
        name="MyBoulders"
        component={Boulders}
        options={{...stackHeader()}}
      />
    </ProjectsStack.Navigator>
  );
};




