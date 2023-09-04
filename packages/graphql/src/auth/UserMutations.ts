import { ObjectId } from "mongodb";
import { db } from "../database";
import { newId, newTime } from "../utils/typeutils";
import { AuthContext } from "./ResolveAuthContext";
import { hash } from "bcrypt";
import { authenticate } from "./Authentication";
import { Logger } from "../utils/logging";

const logger = new Logger("User Mutations");

async function createUser(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
) {
  logger.info(`Received request to create new user ${args.username}`);
  const id = newId();

  // Check for duplicate usernames
  var duplicates = await db.usersCollection?.findOne({
    username: args.username,
  });
  if (duplicates) throw Error("User with that username already exists");
  // Check for duplicate emails
  duplicates = await db.usersCollection?.findOne({
    email: args.email,
  });
  if (duplicates) throw Error("User with that email already exists");

  // Hash the password
  const pass_hash = await hash(args.password, 10);

  // Is unique, so create
  await db.usersCollection?.insertOne({
    // Dont do ...args because then we copy the password !
    ...id, // Remember these have the form { _id: ObjectId } !
    ...newTime(),
    username: args.username,
    email: args.email,
    name: args.name,
    pass_hash,
    locations: [],
    routes: [],
    comments: [],
    ratings: [],
    verified: false,
    preferences: {},
  });

  return await authenticate(
    parent,
    { identifier: args.email, password: args.password },
    context,
    info
  );
}

export const userMutations = { createUser };
