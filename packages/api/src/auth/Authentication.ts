import { compare } from "bcrypt";
import { AuthContext } from "./ResolveAuthContext";
import { searchUser } from "../users/dbOperations";
import * as jwt from "jsonwebtoken";
import { Logger } from "../utils/logging";
import env from "../env";

const logger = new Logger("Authorize");

export async function authenticate(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
) {
  // If they identify via email, will include @
  if (args.identifier.includes("@"))
    var user = await searchUser({ email: args.identifier });
  else var user = await searchUser({ username: args.identifier });

  // Search user returned null
  if (!user) throw new Error("User not found");

  const res = await compare(args.password, user.pass_hash);
  if (!res) throw new Error("Incorrect password");

  const token = jwt.sign(
    { user_id: user.id },
    env.JWT_SECRET as any,
    {
      // Caution: Setting an expiry will only work if we encode an object
      // Don't change it back to a string!
      expiresIn: "60d",
    }
  );
  return token;
}

export async function verifyToken(
  parent: any,
  args: any,
  context: AuthContext,
  info: any
) {
  try {
    jwt.verify(args.token, env.JWT_SECRET as any);
  } catch (err) {
    logger.error(err);
    return false;
  }
  return true;
}
