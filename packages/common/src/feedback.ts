import { ID, Time } from "./abstract"

export type Source = {
    user_id: ID,
}

export type Target = {
    target_type: ReviewTarget,
    target_id: ID
}

export type Rating = Source & Time & {
    rating: number,
}

// Ratings are stored directly on the target 
export type Ratings = Target & {
    list: Rating[],
}

// Comments can be uniquely identified by their target_id in a seperate collection
// They are not stored on the target due to fertility of inflated data
export type Comments = Target & Comment[] 

export type Comment = Time & Source & {
    text: string,
    votes: number,
    replies: Reply[]
}
export type Reply = Source & Time & {
    reply_to: string, // @ Username
    text: string
    votes: string
}

export enum ReviewTarget {
    Location = "Location",
    Route = "Route",
}