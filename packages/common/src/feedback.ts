import { ID, LinkedID, Time } from "./abstract"

export type Source = {
    user_id: LinkedID,
}

export type Target = {
    target_type: ReviewTarget,
    target_id: LinkedID
}

export enum ReviewTarget {
    Location = "Location",
    Route = "Route",
}

export type RatingValue = {
    value: number
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