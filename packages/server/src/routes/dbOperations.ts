import { ObjectId } from "mongodb";
import { db } from "../database";
import { Logger } from "../utils/logging";
import { Route } from "common";

// This file provides an abstraction layer for all route related operations on the database

const logger = new Logger("Route Utils");

export async function updateRoute(route_id: string, payload: Object) {
  await db.routesCollection?.findOneAndUpdate(
    { _id: new ObjectId(route_id) },
    { $set: payload }
  );
}

export async function getRoutes(ids: string[]) {
  var routes = [];
  for (var id of ids) {
    var _id = new ObjectId(id);
    var route = (await db.routesCollection?.findOne({ _id })) as Route;
    logger.info(`Retrieved route ${route.name}`);
    routes.push(route);
  }

  return routes;
}

export async function uploadRoute(route: Route) {
  await db.routesCollection?.insertOne(route);
}
