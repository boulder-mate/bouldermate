import { User } from "common";
import { db } from "../database";
import { AuthContext } from "./ResolveAuthContext";

async function getUser(obj: any, args: any, context: AuthContext, info: any) {
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
  return user;
}

export const userQueries = { getUser };
