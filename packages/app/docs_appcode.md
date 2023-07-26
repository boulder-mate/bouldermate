

## ENV

Env variables should be updated + considered in the following locations before creating any build
  - A local .env file which is gitignored
  - app.config.ts - this injects the contents of .env to the app
  - eas.json