const NODE_ENV = process.env.NODE_ENV;
export var REQUEST_PREFIX = NODE_ENV === "local" ? "http" : "https";

if (!process.env.NODE_ENV) {
  throw "Invalid Node env supplied!";
}
