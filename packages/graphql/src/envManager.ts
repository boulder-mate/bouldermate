const NODE_ENV = process.env.NODE_ENV;
export var REQUEST_PREFIX = NODE_ENV === "local" ? "http" : "https";

if (!process.env.NODE_ENV) {
  throw "NODE_ENV not supplied!";
}

if (!process.env.MONGO_USERNAME) {
  throw "MONGO_USERNAME not supplied!"
}

if (!process.env.MONGO_PASS) {
  throw "MONGO_PASS not supplied!"
}

if (!process.env.MONGO_ID) {
  throw "MONGO_ID not supplied! (this is the cluster ID of the service)"
}
