import { S3Client } from "@aws-sdk/client-s3";
import {
  LocationClient,
  SearchPlaceIndexForTextCommand,
} from "@aws-sdk/client-location";
import env from "./envManager";

// General config settings for all the SDK clients
const config = {
  region: env.AWS_REGION as any,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY as any,
    secretAccessKey: env.AWS_SECRET as any,
  },
};

// Initialise AWS S3
export const s3 = new S3Client(config);

// Initialise Location services for geocoding capabilities
export const searchAwsLocations = async (text: string, country: string) => {
  const client = new LocationClient(config);
  const input = {
    // SearchPlaceIndexForTextRequest
    IndexName: "bm-index", // required
    Text: text, // required
    FilterCountries: [
      // CountryCodeList
      country,
    ],
    MaxResults: 3,
    Language: "en-gb",
  };
  const command = new SearchPlaceIndexForTextCommand(input);
  const response = await client.send(command);

  // Implicitly, this acts as validation
  if (!response.Results?.length || !response.Results[0]?.Place)
    throw Error("AWS could not validate the location exists");

  // If we found something, return the best result - all we need are coordinates anyway
  return response.Results[0].Place;
};
