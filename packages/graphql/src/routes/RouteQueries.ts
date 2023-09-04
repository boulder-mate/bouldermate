import { AuthContext } from "../auth/ResolveAuthContext";
import { Route } from "common";
import { db } from "../database";
import { ObjectId } from "mongodb";
import { Logger } from "../utils/logging";
import { Project } from "common";

const logger = new Logger("RouteQueries");

const PAGINATION_SIZE = 50;

export async function getRoutesById(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
) {
  logger.info(`Processing route query for IDs ${args.ids}`);

  var routes = [];
  for (var id of args.ids) {
    var _id = new ObjectId(id);
    var route = (await db.routesCollection?.findOne({ _id })) as Route;
    logger.info(`Retrieved route ${route.name}`);
    routes.push(route);
  }

  return routes;
}

export async function getUserRoutes(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
) {
  var querying = context.user?.projects?.map((x: Project) => x.route);
  if (!querying) return [];

  logger.info(`Received nonempty query for user routes ${querying}`);

  // We use an optional page param for pagination - these return a different slice of the total routes array
  var page = args.page || 0;
  querying = querying.slice(page, page + PAGINATION_SIZE);

  return await getRoutesById(parent, { ids: querying }, context, info);
}

export const routeQueries = {
  getRoutesById,
  getUserRoutes,
};
