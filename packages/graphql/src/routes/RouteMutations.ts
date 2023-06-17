import { AuthContext } from "../auth/ResolveAuthContext";

export async function createRoute(
    obj: any,
    args: any,
    context: AuthContext,
    info: any): Promise<boolean> {
      return false  
}

export const routeMutations = {
    createRoute,
}