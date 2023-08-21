import { ID, LinkedID, Time } from "./abstract";

export type Source = {
  user_id: LinkedID;
};

export type RatingValue = {
  value: number;
};

// Ratings are stored on their target!
export type Rating = Time & Source & RatingValue;

// Comments also stored on their target, replies are defined recursively
export type Comment = ID &
  Time &
  Source & {
    text: string;
    votes: number;
    replies: Comment[];
  };
