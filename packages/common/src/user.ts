import { ID, LinkedID } from "./abstract"

export type User = ID & {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    phone_number?: string,
    preferences: UserPreferences,
    locations: LinkedID[],
    routes: LinkedID[],
    ratings: LinkedID[],
    comments: LinkedID[],
    verified?: boolean
    
    // Routesetters only
    routes_created?: LinkedID[],
    company?: LinkedID[],
    experience?: number,

    // Gym admin only
    company_admin?: boolean,
    
    // Activity for a user will be stored by their user ID in a different collection
}

export type UserPreferences = {
    // These will get fleshed out with the frontend
    private?: boolean
}

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