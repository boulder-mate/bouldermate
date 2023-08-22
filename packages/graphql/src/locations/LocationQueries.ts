import { AuthContext } from "../auth/ResolveAuthContext";
import { Location } from "common";
import { db } from "../database";
import { ObjectId } from "mongodb";
import { Logger } from "../utils/logging";

const logger = new Logger("RouteQueries");

export async function getLocationsById(
  obj: any,
  args: any,
  context: AuthContext,
  info: any
) {
  logger.info(`Received location query for IDs ${args.ids}`);

  var locations = [];
  for (var id of args.ids) {
    var _id = new ObjectId(args.id);
    var loc = (await db.locationsCollection?.findOne({ _id })) as Location;
    logger.info(`Retrieved location ${loc.name}`);
    locations.push(loc);
  }

  return locations;
}

export const locationQueries = {
  getLocationsById,
};
