import { v4 as uuid } from "uuid";
import { Place } from "@aws-sdk/client-location";

export function newId() {
  return { id: uuid() };
}

export function newTime() {
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
  };
};
