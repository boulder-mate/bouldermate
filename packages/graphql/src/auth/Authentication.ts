import { compare } from "bcrypt";
import { AuthContext } from "./ResolveAuthContext";
import { searchUser } from "./Utils";
import * as jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function authenticate(
  obj: any,
  args: any,
  context: AuthContext,
  info: any
) {
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
      expiresIn: "2 days",
    }
  );
  return token;
}
