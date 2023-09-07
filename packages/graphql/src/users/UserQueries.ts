import { AuthContext } from "../auth/ResolveAuthContext";
import { searchUser } from "./dbOperations";
import { authenticate, verifyToken } from "../auth/Authentication";

async function getUser(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
) {
  var user = await searchUser(args);
  if (!user) throw new Error("User not found");
  return user;
}

async function currentUser(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
) {
  return context.user;
}

export const userQueries = { getUser, currentUser, authenticate, verifyToken };
