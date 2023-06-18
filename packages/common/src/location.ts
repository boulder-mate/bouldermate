import { Route, RouteTypes } from "./route"
import { ID, LinkedID, Time } from "./abstract";
import { Rating, Comment } from "./feedback";

export type Location = ID & Time & {
    name: string;
    routes: Map<RouteTypes, LinkedID[]>,
    metadata: LocationMetadata,
    company: LinkedID,
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
