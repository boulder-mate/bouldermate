import { ID } from "./abstract"

export type Feedback = {
    user: ID,
    target_type: ReviewTarget,
    target_id: ID
}

export type Ratings = {
    average?: number,
    list: Rating[],
}

export type Rating = Feedback & {
    rating: number,
}

export type Comment = Feedback & {
    comment: string,
    votes: number,
    children: Comment[]
}

export enum ReviewTarget {
    Location = "Location",
    Route = "Route",
}