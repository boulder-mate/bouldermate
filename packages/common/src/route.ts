import { ID, LinkedID, Time } from "./abstract";
import { Grade } from "./grades";
import { Rating } from "./feedback";

export type Route = Time &
  ID & {
    type: RouteTypes;
    grades: {
      routesetter?: Grade;
      user: Grade[];
    };
    colors: string[];
    name: string;
    routesetters: ID[];
    image: string; // image url
    location: ID;

    active: boolean; // Is the route still there and useable
    decomissioned?: string; // The time the route was taken down, if it was
    notes?: string;
    
    ascents: number; // Derived per update
    projects: number; // Derived per update
    // average_rating: number; // Derived per update

    // ratings: LinkedID; // Stored in their own collection!
    // comments: LinkedID; // Stored in their own collection!
  };

export enum RouteTypes {
  Boulder = "Boulder",
  Rope = "Rope",
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
  Wood = "#D2B48C", // Lighter wood color hex code
}

export type Project = ID &
  Time & {
    user: LinkedID;
    route: LinkedID | Route;
    status: ProjectStatus;
    flash?: boolean;
    onsight?: boolean;
    redpoint?: boolean;
    notes: string[];
  };

export enum ProjectStatus {
  Completed = "Completed",
  Projecting = "Projecting",
  Following = "Following",
}
