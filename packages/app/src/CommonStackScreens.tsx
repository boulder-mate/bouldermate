import { TypedNavigator } from "@react-navigation/native";
import { RoutePage } from "./ClimbRoutes/RoutePage";
import { RouteUpload } from "./ClimbRoutes/Uploads/RouteUpload";
import { stackHeader } from "./Header";

export const CommonScreens = (stack) => {
  return [
    <stack.Screen
      name="RoutePage"
      key="RoutePage"
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
