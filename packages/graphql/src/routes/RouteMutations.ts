import { Project, ProjectStatus, Route } from "common";
import { newId, newTime } from "../utils/typeutils";
import { AuthContext } from "../auth/ResolveAuthContext";
import { uploadImage } from "../utils/fileutils";
import { db } from "../database";
import { Logger } from "../utils/logging";
import { updateUser } from "../users/dbOperations";
import { getRoutesById } from "./RouteQueries";
import { updateRoute, uploadRoute } from "./dbOperations";
import { updateLocationRating } from "../locations/utils";

const logger = new Logger("Route Mutation");

export async function createRoute(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
): Promise<string> {
  var input = args.route;
  logger.info("Received route creation request");

  // Need to handle the image upload first
  var imageUrl = await uploadImage(input.image, "testfile");

  // Create object
  var route: Route = {
    ...newId(),
    ...newTime(),
    type: input.type,
    grades: {
      routesetter: input.routesetter_grade || undefined,
      user: [],
    },
    colors: input.colors,
    rating: {
      sum: 0,
      total_ratings: 0,
    },
    active: true,
    name: input.name,
    routesetters: input.routesetters,
    location: input.location,
    image: imageUrl,
    // ratings: [],
    // comments: [],

    ascents: 0,
    projects: 0,
  };

  // Upload to database
  logger.info(`Uploading route to db ${route}`);
  await uploadRoute(route);

  // Return string id of newly created object
  return route._id.toString();
}

export async function addProjectToUser(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
) {
  logger.info("Adding route to user as project");

  if (!context.user?._id)
    throw new Error("No user token was attached to update request");
  var projects = context.user.projects;
  var newProject = {
    ...newTime(),
    route: args.route_id,
    status: ProjectStatus.Projecting,
    notes: [],
  } as Project;

  projects.push(newProject);

  await updateUser({ projects }, context.user._id);
  return true;
}

export async function rateRoute(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
) {
  logger.info("Received route rating from user");

  // Resolve user and specified project
  var projects = context.user?.projects;
  if (!projects) return new Error("No user attached to route rating");

  const i = projects.findIndex((x) => x.route === args.route_id);
  if (i === -1)
    return new Error("You need to add a route as a project before rating it!");

  // Get the project data, including whether user left a previous review
  const project = projects[i as any] as any;
  const hasReviewed = !!project.rating;
  logger.debug(
    `User has reviewed before? ${hasReviewed}, previous rating: ${project.rating}`
  );

  // Get the route data
  var route = (
    await getRoutesById(parent, { ids: [args.route_id] }, context, info)
  )[0];

  // Update the rating
  const newRating = {
    sum: route.rating.sum + args.rating + (hasReviewed ? -project.rating : 0),
    total_ratings: route.rating.total_ratings + (hasReviewed ? 0 : 1),
  };
  logger.debug(`Route rating data updated to ${JSON.stringify(newRating)}`);

  // Write new rating to db
  await updateRoute(args.route_id, {
    rating: newRating,
  });

  // Feed this through to the location if resulting average changes
  // No need to await this
  const sumDelta = newRating.sum - route.rating.sum;
  const totalDelta = newRating.total_ratings - route.rating.total_ratings;
  updateLocationRating(sumDelta, totalDelta, route.location);

  // Add the rating to the users project
  projects[i as any].rating = args.rating;
  logger.debug("Updating user rating for project");
  await updateUser({ projects }, context.user?._id);

  return true;
}

export const routeMutations = {
  createRoute,
  addProjectToUser,
  rateRoute,
};
