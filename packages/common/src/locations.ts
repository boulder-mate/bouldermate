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
    indoor?: Boolean;
    company?: LinkedID;
    ratings?: Rating[];
    comments?: Comment[];
  };

export type LocationMetadata = {
  address: string;
  suburb: string;
  state: string;
  country: string;
  coordinates: string;
  gmaps_link?: string;
  gmaps_rating?: number;
};

export type Coordinates = {
  lat: number;
  lng: number;
};
