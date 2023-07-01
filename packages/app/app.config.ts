import "dotenv/config";
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
    owner: "Ethan Husband",
    name: "BoulderMate",
    slug: "bouldermate",
    currentFullName: "@user/bouldermate",
    originalFullName: "@user/bouldermate",
    version: "1.0.0",
    icon: "./assets/images/logo-whitebg.png",
    orientation: "portrait",
    userInterfaceStyle: "light",
    runtimeVersion: {
      policy: "sdkVersion",
    },
    jsEngine: "hermes",
    splash: {
      image: "./assets/images/logo-whitebg.png",
      resizeMode: "contain",
      backgroundColor: "#fff",
    },
    packagerOpts: {
      sourceExts: ["cjs"],
    },
    updates: {
      url: `https://u.expo.dev/${process.env.EAS_PROJECT_ID}`,
    },
    assetBundlePatterns: ["**/*"],
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [],
    extra: {
      gqlHostname: process.env.GQL_HOSTNAME,
      nodeEnv: process.env.APP_ENV,
      httpPrefix: process.env.APP_ENV === "local" ? "http" : "https",
      wsPrefix: process.env.APP_ENV === "local" ? "ws" : "wss",
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
});
