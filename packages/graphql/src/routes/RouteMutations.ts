import { Route } from "common";
import { newId, newTime } from "../utils/typeutils";
import { AuthContext } from "../auth/ResolveAuthContext";
import { uploadImage } from "../utils/fileutils";
import { v4 as uuid } from "uuid";
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
  var image = await input.image;
  var imageUrl = await uploadImage(image, "testfile_" + uuid());

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
