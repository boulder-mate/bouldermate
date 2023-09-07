import { ObjectId } from "mongodb";
import { db } from "../database";
import { newId, newTime } from "../utils/typeutils";
import { AuthContext } from "../auth/ResolveAuthContext";
import { hash } from "bcrypt";
import { authenticate } from "../auth/Authentication";
import { Logger } from "../utils/logging";
import { searchUser, uploadUser } from "./dbOperations";

const logger = new Logger("User Mutations");

async function createUser(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
) {
  logger.info(`Received request to create new user ${args.username}`);

  // Check for duplicate usernames
  var duplicates = await searchUser({ username: args.username });
  if (duplicates) throw Error("User with that username already exists");
  // Check for duplicate emails
  duplicates = await searchUser({ email: args.email });
  if (duplicates) throw Error("User with that email already exists");

  // Hash the password
  const pass_hash = await hash(args.password, 10);

  // Is unique, so create
  const user = {
    // WARNING: Dont do ...args because then we copy the password !
    ...newId(),
    ...newTime(),
    username: args.username,
    email: args.email,
    name: args.name,
    pass_hash,
    locations: [],
    projects: [],
    comments: [],
    ratings: [],
    verified: false,
    preferences: {},
  };
  await uploadUser(user);

  // Verify user as this is always next step
  return await authenticate(
    parent,
    { identifier: args.email, password: args.password },
    context,
    info
  );
}

export const userMutations = { createUser };
