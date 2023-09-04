import { ID, LinkedID, Time } from "./abstract";
import { Rating, Comment } from "./feedback";

export type Location = ID &
  Time & {
    name: string;
    routes: {
      active: string[];
      inactive: string[];
    };
    metadata: LocationMetadata;
    image: string;

    indoor?: Boolean;
    company?: LinkedID;
    ratings?: Rating;
    // comments?: Comment[];
  };

export type LocationMetadata = {
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  coordinates: Coordinates;
};

export type Coordinates = {
  lat: number;
  lng: number;
};
