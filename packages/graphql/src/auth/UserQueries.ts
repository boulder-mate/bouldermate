import { User } from "common";
import { db } from "../database";
import { AuthContext } from "./ResolveAuthContext";
import { searchUser } from "./Utils";
import { compare } from "bcrypt";
import * as jwt from "jsonwebtoken";

async function getUser(obj: any, args: any, context: AuthContext, info: any) {
  var user = await searchUser(args);
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

async function authenticate(
  obj: any,
  args: any,
  context: AuthContext,
  info: any
) {
  var user = await searchUser({ username: args.username, email: args.email });
  if (!user) throw new Error("User not found");

  const res = await compare(args.password, user.pass_hash);
  if (res) return "";

  const token = jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  return token;
}

export const userQueries = { getUser, currentUser, authenticate };
