import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";

import { CameraScreen } from "../Utils/Camera";

export const RouteUpload = () => {
  const [image, updateImage] = useState(null);

  return (
    <View>
      <CameraScreen height={250} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
