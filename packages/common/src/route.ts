import { ID, LinkedID, Time } from "./abstract"
import {Grade} from "./grades"
import {Target, Rating } from "./feedback"

export type Route = Time & ID & {
    type: RouteTypes,
    grades: {
        routesetter?: Grade,
        user: Grade[]
    },
    colors: string[],
    name: string, // Set by the Route Setters on creation
    routesetters: ID[],
    notes?: string,
    active: boolean, // Is the route still there and useable
    decomissioned?: string, // The time the route was taken down, if it was
    image: string, // image url
    location: ID,
    ratings?: Rating[], 
    comments?: Rating[],
    ascents?: number, // Derived
    projects?: number, // Derived
    // Comments are stored in their own collection, so are not apart. Data will get inflated otherwise
    // They can be found via the ID of the route (similarly for location comments)
}

export enum RouteTypes {
    Boulder = "Boulder",
    Rope = "Rope"
    // Trad = "Trad", OUTDOORS NOT SUPPORTED YET
    // Ice = "Ice"
}

export enum RouteColors {
    Red = "#FF0000",
    Green = "#00FF00",
    Blue = "#0000FF",
    Yellow = "#FFFF00",
    Orange = "#FFA500",
    Purple = "#800080",
    Pink = "#FFC0CB",
    Black = "#000000",
    White = "#FFFFFF",
    Wood = "#D2B48C" // Lighter wood color hex code
  }

export type Project = ID & Time & {
    user: LinkedID,
    route: LinkedID | Route,
    status: ProjectStatus,
    flash?: boolean,
    onsight?: boolean,
    redpoint?: boolean,
    notes: string[]
}

export enum ProjectStatus {
    Completed = "Completed",
    Projecting = "Projecting",
    Following = "Following"
}