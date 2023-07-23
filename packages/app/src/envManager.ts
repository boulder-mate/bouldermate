import Constants from "expo-constants";

// With expo constants, once Constants.manifest is null, Constants.manifest2 contains the env vars
// Which of these contains data depends on environments
// This unifies them into one function call so we don't have to worry about distinguishing elsewhere
function envVar(varName: string) {
    // Slower but more robust method of finding env var
    for (const extra of [Constants.manifest?.extra, Constants.manifest2?.extra]) {
        const c = extra?.[varName] ?? extra?.expoClient?.extra?.[varName];
        if (c) return c;
    }
    throw new Error(`Constant ${varName} not found in expo manifest.`);
}

enum env {
    GQL_HOSTNAME = envVar("gqlHostname"),
    HTTP_PREFIX = envVar("httpPrefix"),
    WS_PREFIX = envVar("wsPrefix"),
    MONGO_APP_ID = envVar("mongoAppId")
}

export default env