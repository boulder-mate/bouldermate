import "dotenv/config";

export default {
  expo: {
    owner: "ethanhusband",
    name: "BoulderMate",
    slug: "bouldermate",
    scheme: "bouldermate",
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
      requestHeaders: {
        "expo-runtime-version": "1.0.0",
        "expo-channel-name": "local"
      },
    },
    assetBundlePatterns: ["**/*"],
    web: {
      favicon: "./assets/favicon.png",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/logo-whitebg.png",
        backgroundColor: "#ffffff",
      },
      package: "com.bouldermate",
      versionCode: 100,
    },
    ios: {
      bundleIdentifier: "com.bouldermate",
      buildNumber: "1.0.0",
      infoPlist: {
        NSCameraUsageDescription:
          "This app uses the camera to record climbs and upload routes.",
        NSPhotoLibraryUsageDescription:
          "This app uses the photo library to upload climbs and route images.",
      },
      usesAppleSignIn: true,

    },
    plugins: [],
    extra: {
      gqlHostname: process.env.GQL_HOSTNAME,
      nodeEnv: process.env.APP_ENV,
      httpPrefix: process.env.APP_ENV === "local" ? "http" : "https",
      wsPrefix: process.env.APP_ENV === "local" ? "ws" : "wss",
      mongoAppId: process.env.MONGO_APP_ID,
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
  },
};
