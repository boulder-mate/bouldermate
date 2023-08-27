import { Location } from "common";
import { coordinatesFromAwsLocation, newId, newTime } from "../utils/typeutils";
import { AuthContext } from "../auth/ResolveAuthContext";
import { db } from "../database";
import { Logger } from "../utils/logging";
import { searchAwsLocations } from "../aws";
import { uploadImage } from "../utils/fileutils";

export const AMAZON_API_URL = `https://console.aws.amazon.com/apigateway`;
const logger = new Logger("LocationMutations");

export async function createLocation(
  obj: any,
  args: any,
  context: AuthContext,
  info: any
): Promise<string> {
  var input = args.location;
  logger.info("Received location creation request");

  // Derive coordinates - query AWS for locations
  const locdata = input.metadata;
  const search = `${locdata.address}, ${locdata.suburb}, ${locdata.postcode}, ${locdata.state}`;
  var place = await searchAwsLocations(search, locdata.country);
  // Process the coordinates field from the result
  var coordinates = coordinatesFromAwsLocation(place);
  logger.debug(`Retrieved new location coordinates ${coordinates}`);

  // Upload the image
  var imageUrl = await uploadImage(input.image, input.name);

  // Create object
  var location: Location = {
    ...newId(),
    ...newTime(),
    name: input.name,
    image: imageUrl,
    routes: {
      active: [],
      inactive: [],
    },
    metadata: {
      ...input.metadata,
      coordinates,
    },
    indoor: input.indoor,
    company: context.user?._id,
    // ratings: [],
    // comments: [],
  };

  // Upload to database
  logger.info(`Uploading location to db ${location.name}`);
  await db.locationsCollection?.insertOne(location);

  // Return string id of newly created object
  return location._id.toString();
}

export const locationMutations = {
  createLocation,
};
