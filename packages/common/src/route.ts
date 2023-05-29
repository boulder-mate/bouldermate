import { ID } from "./abstract"

export type Route = {
    id: string,
    type: RouteTypes,
    name: string, // Set by the Route Setters on creation
    routesetters: ID[],
    active: boolean, // Is the route still there and useable
    image: string,
    location: ID,
    reviews: ID[],
}

export enum RouteTypes {
    Boulder = "Boulder",
    Lead = "Lead",
    TopRope = "Top Rope",
    Trad = "Trad",
    Ice = "Ice"
}

export type Project = {
    user: ID,
    route: ID,
    status: ProjectStatus,
    flash?: boolean,
    onsight?: boolean,
    redpoint?: boolean,
}

export enum ProjectStatus {
    Completed = "Completed",
    Projecting = "Projecting",
    Following = "Following"
}