import { TouchableHighlight, Text, StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const AddToProjects = () => {
  return (
    <TouchableHighlight
      style={[styles.headerButton, { backgroundColor: "green" }]}
    >
      <Text style={styles.buttonText}>Add to Projects +</Text>
    </TouchableHighlight>
  );
};

const Upload = () => {
  return (
    <TouchableHighlight>
      <View
        style={[styles.headerButton, { backgroundColor: "green", width: 120 }]}
      >
        <Text style={styles.buttonText}>Upload</Text>
        <Ionicons name="cloud-upload" size={20} color="white" />
      </View>
    </TouchableHighlight>
  );
};

export const HeaderButtons = {
  AddToProjects,
  Upload,
};

const styles = StyleSheet.create({
  headerButton: {
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    height: 40,
    maxWidth: 150,
    gap: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Lexend",
    color: "white",
    textAlignVertical: "center",
  },
});
