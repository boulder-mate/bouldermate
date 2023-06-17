import { AuthContext } from "../auth/ResolveAuthContext"
import { Route } from "common"

export async function getRouteById(
    obj: any,
    args: any,
    context: AuthContext,
    info: any) {
    return;
}


export const routeQueries = {
    getRouteById,
}