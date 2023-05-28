import { Route, RouteTypes } from "./route"
import { ID } from "./abstract";

export type Location = {
    id: ID;
    name: string;
    routes: Map<RouteTypes, Route[]>,
    metadata: LocationMetadata,
    company: ID;
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
