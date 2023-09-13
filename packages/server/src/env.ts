// Ensure all necessary env vars are supplied before serving
if (!process.env.NODE_ENV) throw "NODE_ENV not supplied!";

if (!process.env.DATABASE_URL) throw "DATABASE_URL not supplied!";
if (!process.env.JWT_SECRET) throw "JWT_SECRET not supplied!";

if (!process.env.AWS_ACCESS_KEY) throw "AWS_ACCESS_KEY not supplied!";
if (!process.env.AWS_SECRET) throw "AWS_SECRET not supplied!";
if (!process.env.AWS_REGION) throw "AWS_REGION not supplied!";
if (!process.env.AWS_IMAGES_BUCKET) throw "AWS_IMAGES_BUCKET not supplied!";

// Optional vars:
// process.env.PORT - for local

// Wrapper for env vars in the codebase
enum env {
  HTTP_PREFIX = process.env.NODE_ENV === "local" ? "http" : ("https" as any),
  NODE_ENV = process.env.NODE_ENV as any,
  PORT = process.env.PORT as any,

  JWT_SECRET = process.env.JWT_SECRET as any,

  AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY as any,
  AWS_SECRET = process.env.AWS_SECRET as any,
  AWS_REGION = process.env.AWS_REGION as any,
  AWS_IMAGES_BUCKET = process.env.AWS_IMAGES_BUCKET as any,
}

export default env;
