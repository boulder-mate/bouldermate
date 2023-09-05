import { Logger } from "../utils/logging";
import { getLocations, updateLocation } from "./dbOperations";

const logger = new Logger("Location Utils");

// If the average rating of a route down to 2 dp's changes, this should be called
// Such that the average route rating at a location also updates accordingly
export async function updateLocationRating(
  sumDelta: number,
  totalDelta: number,
  location_id: string
) {
  logger.info("Updating location rating");
  var location = (await getLocations([location_id]))[0];

  location.rating = {
    sum: location.rating.sum + sumDelta,
    total_ratings: location.rating.total_ratings + totalDelta,
  };
  logger.debug(
    `Location rating data updated to ${JSON.stringify(location.rating)}`
  );

  await updateLocation(location._id, { rating: location.rating });
}
