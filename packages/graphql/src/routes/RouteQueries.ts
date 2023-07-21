import { AuthContext } from "../auth/ResolveAuthContext"
import { Route } from "common"
import { db } from "../database"
import { ObjectId } from "mongodb"

export async function getRouteById(
    obj: any,
    args: any,
    context: AuthContext,
    info: any) {
    console.log("[GraphQL] Received route query for ID", args.id)

    var id = new ObjectId(args.id)
    var route = await db.routesCollection?.findOne({_id: id})
    console.log("Retrieved route", route)
    return route
}


export const routeQueries = {
    getRouteById,
}