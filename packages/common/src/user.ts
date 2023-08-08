import { ID, LinkedID } from "./abstract";

export type User = ID & {
  username: string;
  name: string;
  company_name: string; // Use this for Gym accounts instead of first + last
  bio?: string;
  email?: string; // Only excluded for Anon accounts!
  phone_number?: string; // Optional - ideally included for Gyms
  preferences: UserPreferences;
  locations: LinkedID[];
  routes: LinkedID[];
  ratings: LinkedID[];
  comments: LinkedID[];
  verified?: boolean;
  anonymous?: boolean;

  // Routesetters only
  routes_created?: LinkedID[];
  company?: LinkedID[];
  years_experience?: number;

  // Gym admin only
  location_admin?: LinkedID[]; // Gym the

  // Activity for a user will be stored by their user ID in a different collection
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
