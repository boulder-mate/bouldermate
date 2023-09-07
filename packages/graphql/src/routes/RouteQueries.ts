import { AuthContext } from "../auth/ResolveAuthContext";
import { Route } from "common";
import { db } from "../database";
import { ObjectId } from "mongodb";
import { Logger } from "../utils/logging";
import { Project } from "common";
import { getRoutes } from "./dbOperations";

const logger = new Logger("Route Query");

export async function getRoutesById(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
) {
  logger.info(`Processing route query for IDs ${args.ids}`);
  return await getRoutes(args.ids);
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
  return await getRoutesById(parent, { ids: querying }, context, info);
}

export const routeQueries = {
  getRoutesById,
  getUserRoutes,
};
