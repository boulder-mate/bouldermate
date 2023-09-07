import { ID, LinkedID, Time } from "./abstract";

export type Source = {
  user_id: LinkedID;
};

export type Target = {
  target_id: LinkedID;
};

// Comments are stored in their own collection, with replies stored recursively.
// The base of a comment tree is typed as a CommentRoot
export type CommentRoot = ID & Time & Source & Target & Comment;

export type Comment = Time &
  Source & {
    text: string;
    votes: number;
    replies: Comment[];
  };

// Ratings are stored on their target - need to be updated synchronously
export type Rating = {
  sum: number;
  total_ratings: number;
};
