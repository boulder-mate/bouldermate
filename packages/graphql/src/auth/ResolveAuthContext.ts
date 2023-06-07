

import { AuthenticationError } from "apollo-server-core";
import {User} from "common";



export type AuthContext = {
  user?: User;
  fingerprint?: any;
};

async function decryptSymmetric(keyName: string, apiKey: string): Promise<any> {
//   const [decryptResponse] = await kms_client.decrypt({
//     name: keyName,
//     ciphertext: Buffer.from(apiKey, 'base64'),
//   });

//   const payload = (decryptResponse.plaintext as string).toString();

//   console.log(`[decryptSymmetric] ${payload}`);
//   return JSON.parse(payload);
}

export async function resolveContext(context: any)/*: Promise<AuthContext>*/ {
//   var token = context.req?.headers?.authorization;
//   var xUserId = context.req?.headers["x-user-id"];
//   var apiKey = context.req?.headers["x-api-key"];
//   var userObject: UserModel | undefined;

//   if (xUserId) {
//     try {
//       userObject = await findUserByUID(xUserId);
//     } catch (err) {}
//   }

//   if (token) {
//     try {
//       userObject = await resolveToken(token);
//     } catch (err) {}
//   }

//   if (apiKey) {
//     try {
//       userObject = await resolveApiKey(apiKey);
//     } catch (err) {}
//   }

//   return {
//     user: userObject,
//   };
}

export async function resolveWSContext(context: any)/*: Promise<AuthContext>*/ {
//   const headers = context["connectionParams"];

//   var token = headers?.authorization;
//   var xUserId = headers?.["x-user-id"];
//   var userObject: UserModel | undefined;

//   if (xUserId) {
//     try {
//       userObject = await findUserByUID(xUserId);
//     } catch (err) {}
//   }

//   if (token) {
//     try {
//       userObject = await resolveToken(token);
//     } catch (err) {}
//   }

//   return {
//     user: userObject,
//   };
}

/*
 *  Resolve a firebase auth token into a user.
 */
export async function resolveToken(token: string)/*: Promise<UserModel>*/ {
//   if (!token || token.length === 0) {
//     throw new AuthenticationError("Invalid token!");
//   }

//   var decodedToken;
//   token = token.replace("Bearer ", "");
//   try {
//     decodedToken = await admin.auth().verifyIdToken(token);
//   } catch (err) {
//     console.error(err);
//     throw new AuthenticationError(`Unauthorized`);
//   }
//   return await findUserByUID(decodedToken.uid);
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

/*s
 *  Resolve user from their UID.s
 */
export async function findUserByUID(uid: string)/*: Promise<UserModel>*/ {
//   if (!uid) {
//     throw new Error(`User can't be found!`);
//   }

//   // Query uid from database, get db object
//   var user: DocumentSnapshot = await admin
//     .firestore()
//     .doc(`users/${uid}`)
//     .get();

//   if (!user.exists) {
//     throw new Error(`User doesn't exist in the database!`);
//   }
//   var userData = user.data() as any;

//   // Instantiate variables
//   var uam: UAM[] = getUAM(userData.uam);

//   var name = userData.name;
//   var email = userData.email;
//   var phone = userData.phone_number;
//   var party_id = userData.party_id;
//   var company = userData.company;
//   var locations = userData.locations;
//   var permissions = userData.permissions;
//   var mfaEnrolled = userData.mfaEnrolled || false;
//   var customer_id = userData.customer_id;
//   var session_id = userData.session_id || undefined;

//   var userModel = new UserModel(
//     permissions.role,
//     uid,
//     name,
//     email,
//     party_id,
//     phone,
//     company,
//     uam,
//     mfaEnrolled,
//     customer_id,
//     session_id
//   );

//   if (userModel.getRole() === Role.locationadmin) {
//     userModel.setAllowedLocations(locations);
//   }

//   return userModel;
}
