import { Route } from "common";
import { newId, newTime } from "../utils/typeutils";
import { AuthContext } from "../auth/ResolveAuthContext";
import {uploadImage} from "../utils/fileutils"
import {v4 as uuid} from "uuid"
import { db } from "../database";

export async function createRoute(
    obj: any,
    args: any,
    context: AuthContext,
    info: any): Promise<string> {
      console.log("received frontend call with args", args)
      var input = await args.image
      if (!input) return "no image found"

      console.log("Received route input for upload:", input)
      // Need to handle the image upload first
      var uploadData = await uploadImage(input, "testfile_" + uuid())

      console.log("image upload url:", uploadData)
      return "test image success";
      var imageUrl = ""

      // Create object
      var route: Route = {
        ...newId(),
        ...newTime(),
        type: input.type,
        grades: {
            routesetter: input.routesetter_grade || undefined,
            user: []
        },
        color: input.color,
        active: true,
        name: input.name,
        routesetters: input.routesetters,
        location: input.location,
        image: imageUrl,
      }

      // Upload to database
      await db.routesCollection?.insertOne(route);

      // Return string id of newly created object
      return route._id.toString();
}

export const routeMutations = {
    createRoute,
}