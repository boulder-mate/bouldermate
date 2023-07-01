import { TouchableHighlight, Text, StyleSheet } from "react-native";
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
    <TouchableHighlight
      style={[styles.headerButton, { backgroundColor: "green" }]}
    >
      <Text style={styles.buttonText}>
        Upload <Ionicons name="upload" />
      </Text>
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
    width: 150,
    alignItems: "center",
  },
  buttonText: {
    marginTop: 4,
    fontSize: 15,
    fontFamily: "Lexend",
    color: "white",
  },
});
