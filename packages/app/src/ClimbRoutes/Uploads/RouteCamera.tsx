import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { CARD_IMG_HEIGHT, EXPANDED_IMG_HEIGHT } from "../RoutePageHeader";

// Kind of heuristic
const CARD_OUTLINE_LOWER = (EXPANDED_IMG_HEIGHT + CARD_IMG_HEIGHT) / 2 - 25;
const CARD_OUTLINE_UPPER = (EXPANDED_IMG_HEIGHT - CARD_IMG_HEIGHT) / 2 - 5;

export function RouteCamera({ height, onCapture }) {
  const [type, setType] = useState(CameraType.back);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [border, setBorder] = useState("black");
  const [buttonColor, setButtonColor] = useState("white");

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    console.log(cameraPermission.status);

    setCameraPermission(cameraPermission.status === "granted");

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === "granted");
  };

  const takePicture = async () => {
    if (camera) {
      var data = await camera.takePictureAsync(null);
      // Flip front facing photos, otherwise they look weird
      const ops =
        type === CameraType.front ? [{ flip: FlipType.Horizontal }] : [];
      // Compress, and perform any necessary flipping
      data = await manipulateAsync(data.uri, ops, {
        format: SaveFormat.PNG,
      });
      // Save the URI
      onCapture(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      onCapture(result.assets[0].uri);
    }
  };

  if (galleryPermission && cameraPermission.status)
    return (
      <View>
        <Text>Camera or photos permission must be granted to proceed.</Text>
      </View>
    );

  useEffect(() => {
    permisionFunction();
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={{ height }}>
      <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
        <View style={styles.cameraRollContainer}>
          <TouchableOpacity style={styles.cameraRoll} onPress={pickImage}>
            <FontAwesome name="image" size={25} />
            <Text>Camera Roll</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleCameraType}
          >
            <Ionicons name="camera-reverse" size={35} color="white" />
          </TouchableOpacity>
        </View>
        <CardOutline />
        <View style={styles.captureContainer}>
          <TouchableOpacity
            style={[
              styles.captureButton,
              { borderColor: border, backgroundColor: buttonColor },
            ]}
            onPress={async () => {
              setBorder("red");
              await takePicture();
            }}
            onPressIn={() => setButtonColor("red")}
            onPressOut={() => setButtonColor("white")}
          />
        </View>
      </Camera>
    </View>
  );
}

const CardOutline = () => {
  return (
    <View>
      <MaterialCommunityIcons
        name="rounded-corner"
        color="white"
        size={30}
        style={{ position: "absolute", top: CARD_OUTLINE_UPPER, right: 0 }}
      />
      <MaterialCommunityIcons
        name="rounded-corner"
        color="white"
        size={30}
        style={{
          position: "absolute",
          top: CARD_OUTLINE_UPPER,
          left: 0,
          transform: [{ rotateY: "180deg" }],
        }}
      />
      <MaterialCommunityIcons
        name="rounded-corner"
        color="white"
        size={30}
        style={{
          position: "absolute",
          top: CARD_OUTLINE_LOWER,
          left: 0,
          transform: [{ rotateY: "180deg" }, { rotateX: "180deg" }],
        }}
      />
      <MaterialCommunityIcons
        name="rounded-corner"
        color="white"
        size={30}
        style={{
          position: "absolute",
          top: CARD_OUTLINE_LOWER,
          right: 0,
          transform: [{ rotateX: "180deg" }],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flexDirection: "column",
    flex: 1,
  },
  buttonContainer: {},
  cameraRollContainer: {
    position: "absolute",
    top: 12,
    left: 10,
    alignItems: "center",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
  },
  cameraRoll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  toggleButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  captureContainer: {
    backgroundColor: "white",
    padding: 3,
    borderRadius: 50,
    width: 75,
    height: 75,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 10,
  },
  captureButton: {
    borderWidth: 1,
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  text: {},
});
