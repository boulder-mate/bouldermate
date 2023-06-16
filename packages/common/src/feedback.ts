import { ID, Time } from "./abstract"

export type Source = {
    user_id: ID,
}

export type Target = {
    target_type: ReviewTarget,
    target_id: ID
}

export enum ReviewTarget {
    Location = "Location",
    Route = "Route",
}

export type RatingValue = {
    rating: number
}

export type Rating = ID & Time & Source & Target & RatingValue

export type Comment = ID & Time & Target & Source & {
    text: string,
    votes: number,
    replies: Reply[]
}
export type Reply = Source & Time & {
    reply_to: string, // @ Username
    text: string
    votes: string
}