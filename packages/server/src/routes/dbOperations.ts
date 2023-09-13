import { Project, Route } from "@prisma/client";
import { db } from "../db";
import { Logger } from "../utils/logging";

// This file provides an abstraction layer for all route related operations on the database

const logger = new Logger("Route Utils");

export async function getRoutes(ids: string[]) {
  var routes = [];

  for (var id of ids) {
    var loc = await db.route.findUnique({ where: { id } });
    if (loc) {
      logger.debug(`Retrieved route ${loc?.name}`);
      routes.push(loc);
    } else {
      logger.debug(`No such route with ID: ${id}`);
      routes.push(null);
    }
  }

  return routes;
}

// This will definitely not scale (only used for the map!)
export async function allRoutes() {
  logger.debug("Retrieving all routes");
  var routes = await db.route.findMany();
  return routes;
}

export async function createRoute(route: Route) {
  await db.route.create({ data: route });
}

export async function updateRoute(route_id: string, payload: Object) {
  await db.route.update({ data: payload, where: { id: route_id } });
}

export async function createProject(project: Project) {
  // We do this manually here
  await db.project.create({ data: project });
}

export async function getProjectsOnUser(user_id: string) {
  return await db.project.findMany({ where: { user_id } });
}
