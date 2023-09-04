import { ID, Time, LinkedID } from "./abstract";
import { Project } from "./route";

export type User = ID &
  Time & {
    username: string;
    name: string;
    email: string;
    pass_hash: string;
    locations: LinkedID[];
    projects: Project[];
    ratings: LinkedID[];
    comments: LinkedID[];
    verified: boolean;
    preferences: UserPreferences;

    // Additional info
    bio?: string;

    // Routesetters only
    routesetter?: RoutesetterDetails;
    // Gym admin only
    company_admin?: CompanyAdminDetails;
    // Gym account only
    company?: CompanyDetails;

    // Activity for a user will be stored by their user ID in a different collection
  };

export type RoutesetterDetails = {
  routes_created: LinkedID[];
  companies: LinkedID[];
  routesetting_since?: String;
};

export type CompanyAdminDetails = {
  companies: LinkedID[];
  readonly?: boolean;
};

export type CompanyDetails = {
  company_name: string;
  phone_number: string;
  logo?: string;
  // Stripe stuff should go here as well
};

export type UserPreferences = {
  // These will get fleshed out with the frontend
  private?: boolean;
};
