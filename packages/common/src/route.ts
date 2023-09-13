import { ID, LinkedID, Time } from "./abstract";
import { Grade } from "./grades";
import { Rating } from "./feedback";

export type Route = Time &
  ID & {
    type: RouteTypes[];
    grades: {
      routesetter?: Grade;
      user: Grade[];
    };
    colors: string[];
    name: string;
    routesetters: string[];
    image: string; // image url
    location: LinkedID;
    rating: Rating;

    active: boolean; // Is the route still there and useable
    decomissioned?: string; // The time the route was taken down, if it was
    notes?: string;

    ascents: number; // Derived per update
    projects: number; // Derived per update

    // comments: LinkedID; // Stored in their own collection!
  };

export enum RouteTypes {
  Boulder = "Boulder",
  TopRope = "Top Rope",
  Lead = "Lead",
  AutoBelay = "AutoBelay",
  // Trad = "Trad", OUTDOORS NOT SUPPORTED YET
  // Ice = "Ice"
}

export 

// Stored on a user
export type Project = Time & {
  route: LinkedID;
  status: ProjectStatus;
  flash?: boolean;
  onsight?: boolean;
  redpoint?: boolean;
  rating?: number;
  notes: string[];
};

export enum ProjectStatus {
  Completed = "Completed",
  Projecting = "Projecting",
  Projected = "Projected", // Projecting -> Inactive
  Following = "Following",
}
