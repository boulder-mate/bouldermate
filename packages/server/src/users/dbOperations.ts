import { User } from "@prisma/client";
import { db } from "../db";

export type UserSearchParams = {
  id?: string;
  email?: string;
  username?: string;
};

export async function searchUser(args: UserSearchParams): Promise<User | null> {
  // Query a user by id, username or email - one function for all
  var query = {} as any;
  if (args.id) {
    query = { id: args.id };
  } else if (args.email) {
    query = { email: args.email };
  } else if (args.username) {
    query = { username: args.username };
  } else {
    throw new Error(
      "None of id, email or username fields were supplied to query the user"
    );
  }

  var user = await db.user.findUnique({ where: query });
  if (!user) return null;
  else return user as User;
}

export async function updateUser(payload: Object, user_id: string) {
  return await db.user.update({ data: payload, where: { id: user_id } });
}

export async function uploadUser(user: User) {
  return await db.user.create({ data: user });
}
