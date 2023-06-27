import { TypedNavigator } from "@react-navigation/native";
import { RoutePage } from "./ClimbRoutes/RoutePage";
import { RouteUpload } from "./ClimbRoutes/RouteUpload";
import { stackHeader } from "./Header";

export const CommonScreens = (stack) => {
  return [
    <stack.Screen
      name="Route"
      key="Route"
      component={RoutePage}
      options={{ ...stackHeader() }}
    />,
    <stack.Screen
      name="RouteUpload"
      key="RouteUpload"
      component={RouteUpload}
      options={{ ...stackHeader() }}
    />,
  ];
};
