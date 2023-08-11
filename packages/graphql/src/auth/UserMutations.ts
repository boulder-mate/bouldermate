import { ObjectId } from "mongodb";
import { db } from "../database";
import { newId, newTime } from "../utils/typeutils";
import { AuthContext } from "./ResolveAuthContext";

async function createUser(
  obj: any,
  args: any,
  context: AuthContext,
  info: any
) {
  const _id = newId();

  // No duplicate emails or usernames!
  var duplicates = await db.usersCollection?.findOne({
    username: args.username,
  });
  if (duplicates) throw Error("User with that username already exists");
  duplicates = await db.usersCollection?.findOne({
    email: args.email,
  });
  if (duplicates) throw Error("User with that email already exists");

  // Is unique, so create
  await db.usersCollection?.insertOne({
    _id,
    ...args,
    ...newTime(),
    locations: [],
    routes: [],
    comments: [],
    reviews: [],
    verified: false,
    preferences: {},
  });
  return _id;
}

export const userMutations = { createUser };
