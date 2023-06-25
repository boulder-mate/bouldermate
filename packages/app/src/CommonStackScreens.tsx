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
      name="UploadRoute"
      key="UploadRoute"
      component={RouteUpload}
      options={{ ...stackHeader() }}
    />,
  ];
};
