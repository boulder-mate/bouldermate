import { Route, RouteTypes } from "./route"
import { ID } from "./abstract";

export type Location = {
    id: ID;
    routes: Map<RouteTypes, Route[]>,
    where: LocationMetadata,
    who: string; // ID of owning company
}

export type LocationMetadata = {
    address: string,
    suburb: string,
    state: string,
    country: string,
    coordinates: string,
    gmaps_link?: string
}

export type CompanyMetadata = {

}