

## Environment Configuration

Env variables should be updated + considered in the following locations before creating any build
  - A local .env file which is gitignored
  - app.config.ts - this injects the contents of .env to the app
  - eas.json

** Note issues may emerge when running the app if you have the wrong IP address for the GraphQL server! (or the server is not running). This should be *your* IP address.

## Development

#### Prereqs

- Ensure you have eas cli installed (check with 'eas --version') and you are logged in to the cli (check with 'eas account:view')

#### Running the App

- Open a simulator
- Run 'eas build --platform {ios/android} --profile preview'. 
  - This will take a while
  - Needs to be redone whenever we change images or env vars
  - Unlike android, the build is not localised
- Run 'eas build:run' and select the latest build
  - This should install the build onto the simulator and open an expo interface
- Then finally do 'npx expo start --dev-client'
- When that opens press {i/a}, and then the development build should be running on the simulator