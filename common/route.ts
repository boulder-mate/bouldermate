import { ID } from "./abstract"

export type Route = {
    id: string,
    type: RouteTypes,
    name: string, // Set by the Route Setters on creation
    routesetters: ID[],
    active: boolean, // Is the route still there and useable
    location: ID 
}

export enum RouteTypes {
    Boulder = "Boulder",
    Lead = "Lead",
    TopRope = "Top Rope",
    Trad = "Trad",
    Ice = "Ice"
}