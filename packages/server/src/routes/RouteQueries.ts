import { AuthContext } from "../auth/ResolveAuthContext";
import { Logger } from "../utils/logging";
import { getProjectsOnUser, getRoutes } from "./dbOperations";

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

export async function getUserProjects(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
) {
  if (!context.user?.id)
    throw new Error("No user token was attached to update request");

  return await getProjectsOnUser(context.user?.id);
}

export const routeQueries = {
  getRoutesById,
  getUserProjects,
};
