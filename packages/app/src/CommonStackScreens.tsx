import { RoutePage } from "./Routes/RoutePage/RoutePage";
import { RouteUpload } from "./Routes/Uploads/RouteUpload";
import { stackHeader } from "./Header";

export const CommonScreens = (stack, includeHeader = true) => {
  return [
    <stack.Screen
      name="RoutePage"
      key="RoutePage"
      component={RoutePage}
      options={includeHeader ? { ...stackHeader() } : { headerShown: false }}
    />,
    <stack.Screen
      name="RouteUpload"
      key="RouteUpload"
      component={RouteUpload}
      options={includeHeader ? { ...stackHeader() } : { headerShown: false }}
    />,
  ];
};
