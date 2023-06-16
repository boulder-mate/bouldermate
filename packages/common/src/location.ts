import { Route, RouteTypes } from "./route"
import { ID, Time } from "./abstract";
import { Rating, Comment } from "./feedback";

export type Location = Time & {
    id: ID;
    name: string;
    routes: Map<RouteTypes, ID[]>,
    metadata: LocationMetadata,
    company: ID,
    ratings?: Rating[],
    comments?: Comment[]
    outdoor?: boolean,
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
