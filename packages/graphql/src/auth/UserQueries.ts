import { User } from "common";
import { db } from "../database";
import { AuthContext } from "./ResolveAuthContext";
import { searchUser } from "./Utils";

async function getUser(obj: any, args: any, context: AuthContext, info: any) {
  var user = searchUser(args);
  if (!user) throw new Error("User not found");
  return user;
}

async function currentUser(
  obj: any,
  args: any,
  context: AuthContext,
  info: any
) {
  return context.user;
}

export const userQueries = { getUser, currentUser };
