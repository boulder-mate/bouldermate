const NODE_ENV = process.env.NODE_ENV;
export var REQUEST_PREFIX = NODE_ENV === "local" ? "http" : "https";

if (!process.env.NODE_ENV) throw "NODE_ENV not supplied!";

if (!process.env.MONGO_URL) throw "MONGO_URL not supplied!";

if (!process.env.JWT_SECRET) throw "JWT_SECRET not supplied!";

if (!process.env.AWS_ACCESS_KEY) throw "AWS_ACCESS_KEY not supplied!";
if (!process.env.AWS_SECRET) throw "AWS_SECRET not supplied!";
