import { ID, Time } from "./abstract"
import {Grade} from "./grades"
import { Ratings } from "./feedback"

export type Route = Time & {
    id: ID,
    type: RouteTypes,
    grade: {
        routesetter?: Grade,
        user: Grade[]
    },
    name: string, // Set by the Route Setters on creation
    routesetters: ID[],
    active: boolean, // Is the route still there and useable
    image: string,
    location: ID,
    ratings: Ratings, 
    // Comments are stored in their own collection, so are not apart. Data will get inflated otherwise
    // They can be found via the ID of the route (similarly for location comments)
}

export enum RouteTypes {
    Boulder = "Boulder",
    Lead = "Lead",
    TopRope = "Top Rope",
    Trad = "Trad",
    Ice = "Ice"
}

export type Project = Time & {
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