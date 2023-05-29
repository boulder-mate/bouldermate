import { ID } from "./abstract"

export type User = {
    id: ID,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    preferences: UserPreferences,
    locations: ID[],
    routes: ID[],
    reviews: ID[],
    verified?: boolean
}

export type UserPreferences = {

}

export type RouteSetter = User & {
    routes: ID[],
    company: ID,
    experience: number,
}