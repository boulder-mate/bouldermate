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
  logger.info(`Received route query for ID ${args.id}`);

  var id = new ObjectId(args.id);
  var route = await db.routesCollection?.findOne({ _id: id });
  logger.info(`Retrieved route ${route}`);
  return route;
}

export const routeQueries = {
  getRoutesById,
};
