import { ID } from "./abstract"

export type User = {
    id: ID,
    username: string,
    first_name: string,
    last_name: string,
    email?: string,
    phone_number?: string,
    preferences: UserPreferences,
    locations: ID[],
    routes: ID[],
    ratings: ID[],
    comments: ID[],
    verified?: boolean
    // Activity for a user will be stored by their user ID in a different collection
}

export type UserPreferences = {
    // These will get fleshed out with the frontend
    private?: boolean
}

export type RouteSetter = User & {
    routes: ID[],
    company: ID,
    experience: number,
}

export type UserActivities = Activity[];

export type Activity = {
    user_id: ID,
    path: ActivityPath, // This is such that we can do path + activity_id to navigate to the page
    activity_id: ID, // This is the ID of the object associated to the user
    details: string
}

export enum ActivityPath {
    Project = "Route",
    Location = "Location",
    
}