import { AuthContext } from "../auth/ResolveAuthContext";
import { Location } from "common";
import { db } from "../database";
import { ObjectId } from "mongodb";
import { Logger } from "../utils/logging";
import { allLocations, getLocations } from "./dbOperations";

const logger = new Logger("LocationQueries");

export async function getLocationsById(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
) {
  logger.info(`Received location query for IDs ${args.ids}`);
  return await getLocations(args.ids);
}

export async function getAllLocations(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
) {
  logger.debug(`Received location collection query`);
  var locations = await allLocations();

  return locations as Location[];
}

export async function getUserLocations(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
) {
  if (!context.user?._id)
    throw new Error("No user token was attached to the locations request");
  // Feed the IDs into LocationById Util
  return await getLocationsById(
    parent,
    { ids: context.user.locations },
    context,
    info
  );
}

export const locationQueries = {
  getLocationsById,
  getAllLocations,
  getUserLocations,
};
