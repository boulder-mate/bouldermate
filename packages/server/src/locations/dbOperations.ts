import { Location } from "@prisma/client";
import { db } from "../db";
import { Logger } from "../utils/logging";

// This file provides an abstraction layer for all location related operations on the database

const logger = new Logger("Location Utils");

// This will definitely not scale (only used for the map!)
export async function allLocations() {
  logger.debug("Retrieving all locations");
  var locations = await db.location.findMany();
  return locations;
}

export async function getLocations(ids: string[]) {
  var locations = [];

  for (var id of ids) {
    var loc = await db.location.findUnique({ where: { id } });
    if (loc) {
      logger.debug(`Retrieved location ${loc?.name}`);
      locations.push(loc);
    } else {
      logger.debug(`No such location with ID: ${id}`);
      locations.push(null);
    }
  }

  return locations;
}

export async function getLocationsOnUser(user_id: string) {
  var refs = await db.userOnLocation.findMany({ where: { user_id } });
  var locs = [];
  for (var ref of refs) {
    var loc = await db.location.findUnique({ where: { id: ref.location_id } });
    locs.push(loc);
  }

  return locs;
}

export async function createLocation(location: Location) {
  await db.location.create({ data: location });
}

export async function updateLocation(location_id: string, payload: Object) {
  await db.location.update({ data: payload, where: { id: location_id } });
}
