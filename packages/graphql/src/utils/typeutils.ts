import { Coordinates, ID, Time } from "common";
import { ObjectId } from "mongodb";
import { Place } from "@aws-sdk/client-location";

export function newId(): ID {
  return { _id: new ObjectId() };
}

export function newTime(): Time {
  return {
    created: new Date().toISOString(),
    last_updated: new Date().toISOString(),
  };
}

export const coordinatesFromAwsLocation = (location: Place) => {
  const coordArray = location.Geometry?.Point;
  if (!coordArray) throw new Error("AWS location has no coordinates!");
  return {
    lat: coordArray[0],
    lng: coordArray[1],
  } as Coordinates;
};
