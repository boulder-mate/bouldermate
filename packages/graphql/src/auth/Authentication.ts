import { compare } from "bcrypt";
import { AuthContext } from "./ResolveAuthContext";
import { searchUser } from "./Utils";
import * as jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Logger } from "../utils/logging";

const logger = new Logger("Authorize");

export async function authenticate(
  obj: any,
  args: any,
  context: AuthContext,
  info: any
) {
  // logger.debug(`Received authentication request from ${args.identifer}`);

  // Users enter with their username or email, but we don't know which one they chose
  // Hence we search using both - first assume it was an email, then a username
  var user = await searchUser({ email: args.identifier });
  if (!user) user = await searchUser({ username: args.identifier });
  // Neither the email or username matched a known user
  if (!user) throw new Error("User not found");

  const res = await compare(args.password, user.pass_hash);
  if (!res) throw new Error("Incorrect password");

  const token = jwt.sign(
    { user_id: (user._id as ObjectId).toString() },
    process.env.JWT_SECRET as string,
    {
      // Caution: Setting an expiry will only work if we encode an object
      // Don't change it back to a string!
      expiresIn: "60d",  
    }
  );
  return token;
}

export async function verifyToken(
  obj: any,
  args: any,
  context: AuthContext,
  info: any
) {
  try {
    jwt.verify(args.token, process.env.JWT_SECRET as string);
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}
