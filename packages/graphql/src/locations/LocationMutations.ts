import { Location } from "common";
import { newId, newTime } from "../utils/typeutils";
import { AuthContext } from "../auth/ResolveAuthContext";
import { db } from "../database";
import { Logger } from "../utils/logging";

const logger = new Logger("LocationMutations");

export async function createLocation(
  obj: any,
  args: any,
  context: AuthContext,
  info: any
): Promise<string> {
  var input = args.location;
  logger.info("Received location creation request");

  // Derive coordinates
  var coordinates = deriveCoordinates(input.metadata);

  // Search for gmaps link
  var gmaps_link = deriveGmapsLink(input.metadata);

  // Create object
  var location: Location = {
    ...newId(),
    ...newTime(),
    name: input.name,
    routes: {
      active: [],
      inactive: [],
    },
    metadata: {
      ...input.metadata,
      coordinates,
      gmaps_link,
    },
    indoor: input.indoor,
    company: context.user?._id,
    ratings: [],
    comments: [],
  };

  // Upload to database
  logger.info(`Uploading location to db ${location}`);
  await db.locationsCollection?.insertOne(location);

  // Return string id of newly created object
  return location._id.toString();
}

const deriveCoordinates = async (locationData: any) => {};

const deriveGmapsLink = async (locationData: any) => {};

export const locationMutations = {
  createLocation,
};
