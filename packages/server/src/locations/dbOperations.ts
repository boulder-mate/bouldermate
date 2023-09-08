import { Location } from "common";
import { ObjectId } from "mongodb";
import { db } from "../database";
import { getLocationsById } from "./LocationQueries";
import { Logger } from "../utils/logging";

// This file provides an abstraction layer for all location related operations on the database

const logger = new Logger("Location Utils");

export async function getLocations(ids: string[]) {
  var locations = [];
  for (var id of ids) {
    var _id = new ObjectId(id);
    var loc = (await db.locationsCollection?.findOne({ _id })) as Location;
    logger.info(`Retrieved location ${loc.name}`);
    locations.push(loc);
  }

  return locations;
}

export async function allLocations() {
  var cursor = db.locationsCollection?.find();
  var docArray = await cursor?.toArray();
  return docArray;
}

export async function uploadLocation(location: Location) {
  await db.locationsCollection?.insertOne(location);
}

export async function updateLocation(location_id: string, payload: Object) {
  await db.locationsCollection?.findOneAndUpdate(
    { _id: new ObjectId(location_id) },
    { $set: payload }
  );
}
