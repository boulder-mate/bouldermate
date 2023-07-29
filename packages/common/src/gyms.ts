import { Route, RouteTypes } from "./route"
import { ID, LinkedID, Time } from "./abstract";
import { Rating, Comment } from "./feedback";

export type Gym = ID & Time & {
    name: string;
    routes: Map<RouteTypes, LinkedID[]>,
    location: LocationMetadata,
    company?: Company,
    ratings?: Rating[],
    comments?: Comment[]
}

export type Company = {
    // Financial related tracking - this field is only on a Gym when we are in business with them
    logo: string; // Image url
}

export type LocationMetadata = {
    address: string,
    suburb: string,
    state: string,
    country: string,
    coordinates: string,
    gmaps_link?: string,
    gmaps_rating?: number
}
