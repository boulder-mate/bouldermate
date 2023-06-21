import { Route, newId, newTime } from "common";
import { AuthContext } from "../auth/ResolveAuthContext";
import { db } from "../database";

export async function createRoute(
    obj: any,
    args: any,
    context: AuthContext,
    info: any): Promise<string> {
      var input = args.route;
      // Need to handle the image upload first


      var imageUrl = ""

      // Create object
      var route: Route = {
        ...newId(),
        ...newTime(),
        type: input.type,
        grades: {
            routesetter: input.routesetter_grade || undefined,
            user: []
        },
        color: input.color,
        active: true,
        name: input.name,
        routesetters: input.routesetters,
        location: input.location,
        image: imageUrl,
      }

      // Upload to database
      await db.routesCollection?.insertOne(route);

      // Return string id of newly created object
      return route._id.toString();
}

export const routeMutations = {
    createRoute,
}