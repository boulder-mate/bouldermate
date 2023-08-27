import { Route } from "common";
import { newId, newTime } from "../utils/typeutils";
import { AuthContext } from "../auth/ResolveAuthContext";
import { uploadImage } from "../utils/fileutils";
import { db } from "../database";
import { Logger } from "../utils/logging";

const logger = new Logger("RouteMutations");

export async function createRoute(
  obj: any,
  args: any,
  context: AuthContext,
  info: any
): Promise<string> {
  var input = args.route;
  logger.info("Received route creation request");

  // Need to handle the image upload first
  var imageUrl = await uploadImage(input.image, "testfile");

  // Create object
  var route: Route = {
    ...newId(),
    ...newTime(),
    type: input.type,
    grades: {
      routesetter: input.routesetter_grade || undefined,
      user: [],
    },
    colors: input.colors,
    active: true,
    name: input.name,
    routesetters: input.routesetters,
    location: input.location,
    image: imageUrl,
    // ratings: [],
    // comments: [],

    ascents: 0,
    projects: 0,
  };

  // Upload to database
  logger.info(`Uploading route to db ${route}`);
  await db.routesCollection?.insertOne(route);

  // Return string id of newly created object
  return route._id.toString();
}

export const routeMutations = {
  createRoute,
};
