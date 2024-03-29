import { User } from "@prisma/client";
import { searchUser } from "../users/dbOperations";
import { Logger } from "../utils/logging";
import * as jwt from "jsonwebtoken";
import env from "../env";

export type AuthContext = {
  user: User | null;
  fingerprint?: any;
};

const logger = new Logger("AuthContext");

async function decryptSymmetric(keyName: string, apiKey: string): Promise<any> {
  //   const [decryptResponse] = await kms_client.decrypt({
  //     name: keyName,
  //     ciphertext: Buffer.from(apiKey, 'base64'),
  //   });
  //   const payload = (decryptResponse.plaintext as string).toString();
  //   console.log(`[decryptSymmetric] ${payload}`);
  //   return JSON.parse(payload);
}

export async function resolveContext(context: any): Promise<AuthContext> {
  var token = context.req?.headers?.authorization;
  // If we are developing locally, allow x-user-id to be set in Apollo for easier mocking
  var userId =
    (env.NODE_ENV as any) === "local" ? context.req?.headers["user_id"] : "";
  //   var apiKey = context.req?.headers["x-api-key"];
  var userObject: User | null = null;

  if (token) {
    try {
      userObject = await resolveToken(token);
    } catch (err) {}
  }

  if (userId) {
    try {
      userObject = await searchUser({ id: userId });
    } catch (err) {}
  }

  //   if (apiKey) {
  //     try {
  //       userObject = await resolveApiKey(apiKey);
  //     } catch (err) {}
  //   }
  return {
    user: userObject,
  };
}

/*
 *  Decrypt a JWT token to retrieve user by ID
 */
export async function resolveToken(token: string): Promise<User> {
  try {
    token = token.replace("Bearer ", "");
    // The following returns an object which looks like { user_id: string }
    var decodedToken = jwt.verify(token, env.JWT_SECRET as any);
    var userId = (decodedToken as jwt.JwtPayload).user_id;
    logger.info(`Token implied user ${userId}`);
  } catch (err) {
    logger.error(err);
    throw new Error("Could not verify user authorization token");
  }

  var user = await searchUser({ id: userId });
  if (!user) {
    logger.error("User encoded in authorization token was not found");
    throw new Error("User encoded in authorization token was not found");
  }

  return user;
}

export async function resolveApiKey(apiKey: string) {
  //   const keyName = kms_client.cryptoKeyPath(
  //     serviceAccount.project_id,
  //     "australia-southeast1",
  //     process.env.KMS_KEY_RING_ID as string,
  //     process.env.KMS_KEY_ID as string
  //   );
  //   let payload;
  //   try {
  //     payload = await decryptSymmetric(keyName, apiKey);
  //   } catch (err) {
  //     console.error(err);
  //     throw new AuthenticationError(`Unauthorized`);
  //   }
  //   return await findUserByUID(payload.uid);
}
