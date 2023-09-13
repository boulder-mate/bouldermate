import { Coordinates, ID, Time } from "common";
import { v4 as uuid } from "uuid";
import { Place } from "@aws-sdk/client-location";

export function newId(): ID {
  return { id: uuid() };
}

export function newTime(): Time {
  return {
    created: new Date(),
    last_updated: new Date(),
  };
}

export const coordinatesFromAwsLocation = (location: Place) => {
  const coordArray = location.Geometry?.Point;
  if (!coordArray) throw new Error("AWS location has no coordinates!");
  return {
    lat: coordArray[1],
    lng: coordArray[0],
  } as Coordinates;
};
