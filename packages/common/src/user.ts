import { ID, Time, LinkedID } from "./abstract";

export type User = ID & Time & {
  username: string;
  name: string;
  email: string;
  locations: LinkedID[];
  routes: LinkedID[];
  ratings: LinkedID[];
  comments: LinkedID[];
  verified: boolean;
  preferences: UserPreferences;

  // Additional info
  bio?: string;

  // Routesetters only
  routesetter?: RoutesetterDetails;
  // Gym admin only
  gym_admin?: GymAdminDetails;
  // Gym account only
  gym_info?: GymDetails;

  // Activity for a user will be stored by their user ID in a different collection
};

export type RoutesetterDetails = {
  routes_created: LinkedID[];
  companies: LinkedID[];
  routesetting_since?: String;
};

export type GymAdminDetails = {
  companies: LinkedID[];
  readonly?: boolean
};

export type GymDetails = {
  company_name: string;
  phone_number: string;
  // Stripe stuff should go here as well
};

export type UserPreferences = {
  // These will get fleshed out with the frontend
  private?: boolean;
};

// Activity related features will come later

// export type UserActivities = Activity[];

// export type Activity = {
//     user_id: ID,
//     path: ActivityPath, // This is such that we can do path + activity_id to navigate to the page
//     activity_id: ID, // This is the ID of the object associated to the user
//     details: string
// }

// export enum ActivityPath {
//     Project = "Route",
//     Location = "Location",

// }
