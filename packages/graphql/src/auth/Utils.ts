import { User } from "common";
import { db } from "../database";
import { ObjectId } from "mongodb";

export type UserSearchParams = {
  id?: ObjectId;
  email?: string;
  username?: string;
};

export async function searchUser(args: UserSearchParams): Promise<User | null> {
  // Query a user by id, username or email - one function for all
  var query = {};
  if (args.id) {
    query = { _id: args.id };
  } else if (args.email) {
    query = { email: args.email };
  } else if (args.username) {
    query = { username: args.username };
  } else {
    throw new Error(
      "None of id, email or username fields were supplied to query the user"
    );
  }

  var user = await db.usersCollection?.findOne(query);
  if (!user) return null;
  else return user as User;
}

export async function updateUser(payload: Object, user_id: string) {
  await db.usersCollection?.updateOne({ _id: new ObjectId(user_id) }, payload);
}
