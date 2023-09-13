import { Location } from "@prisma/client";
import { coordinatesFromAwsLocation, newId, newTime } from "../utils/typeutils";
import { AuthContext } from "../auth/ResolveAuthContext";
import { Logger } from "../utils/logging";
import { searchAwsLocations } from "../aws";
import { uploadImage } from "../utils/fileutils";
import { createLocation } from "./dbOperations";
import { searchOrganisation } from "../organisations/dbOperations";

export const AMAZON_API_URL = `https://console.aws.amazon.com/apigateway`;
const logger = new Logger("LocationMutations");

export async function uploadLocation(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
): Promise<string> {
  var input = args.location;
  logger.info("Received location creation request");

  // Verify this was done by an organisation account
  var org = await searchOrganisation({ email: context.user?.email });
  if (!org)
    throw new Error(
      "Cannot create location from account not associated with an organisation"
    );

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
    ...coordinates,
    ...input,
    image: imageUrl,
    org_id: org.id,
  };

  // Upload to database
  logger.info(`Uploading location ${location.name} to db`);
  await createLocation(location);

  // Return string id of newly created object
  return location.id;
}

export const locationMutations = {
  uploadLocation,
};
