import { ObjectId } from "mongodb";
import { db } from "../database";

export async function updateRoute(route_id: string, payload: Object) {
  await db.routesCollection?.findOneAndUpdate(
    { _id: new ObjectId(route_id) },
    payload
  );
}
