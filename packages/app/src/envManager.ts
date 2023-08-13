import Constants from "expo-constants";
import * as OS from "os";
import * as DNS from "dns";

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

function parseGQLHostname() {
  // Return a full hostname if in staging or prod
  if (envVar("nodeEnv") !== "local") return envVar("gqlHostname");

  // Must be local, return IP:PORT
  var ipAddress: string;
  DNS.lookup(OS.hostname(), (err, add, fam) => {
    console.log("add", add);
    ipAddress = add;
  });

  return ipAddress + ":" + envVar("gqlPort");
}

const parseHttpPrefix = () =>
  envVar("nodeEnv") === "local" ? "http" : "https";

enum env {
  GQL_HOSTNAME = parseGQLHostname() as any,
  HTTP_PREFIX = parseHttpPrefix() as any,
  MONGO_APP_ID = envVar("mongoAppId"),
}

export default env;
