import { AuthContext } from "../auth/ResolveAuthContext";
import { Route } from "common";
import { db } from "../database";
import { ObjectId } from "mongodb";
import { Logger } from "../utils/logging";

const logger = new Logger("RouteQueries");

export async function getRoutesById(
  obj: any,
  args: any,
  context: AuthContext,
  info: any
) {
  logger.info(`Received route query for IDs ${args.ids}`);

  var routes = [];
  for (var id of args.ids) {
    var _id = new ObjectId(args.id);
    var route = (await db.routesCollection?.findOne({ _id })) as Route;
    logger.info(`Retrieved location ${route.name}`);
    routes.push(route);
  }

  return routes;
}

export const routeQueries = {
  getRoutesById,
};
