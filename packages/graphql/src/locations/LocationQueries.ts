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

export async function getAllLocations(
  obj: any,
  args: any,
  context: AuthContext,
  info: any
) {
  logger.info(`Received location collection query`);

  var locations = [];
  var cursor = db.locationsCollection?.find();
  var docArray = await cursor?.toArray();
  // Let's hope this doesn't happen..
  if (!docArray)
    throw new Error("Could not find any documents in locations collection");

  return docArray as Location[];
}

export const locationQueries = {
  getLocationsById,
  getAllLocations,
};
