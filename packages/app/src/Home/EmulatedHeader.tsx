import { StyleSheet, View, Text, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// A workaround for the fact our navigation header needs to be on the outside
// A more experienced Frontend Dev would probably have a better idea!
export const EmulateHeader = ({ onBack, headerRight }) => {
  return (
    <View style={styles.main}>
      <View style={styles.backContainer}>
        {onBack && <Ionicons name="chevron-back" size={33} onPress={onBack} />}
      </View>
      <View>
        <Text style={styles.title}>BoulderMate</Text>
      </View>
      <View>{headerRight}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 9,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#AAA",
  },
  backContainer: {
    position: "absolute",
    left: 5,
    top: 11,
  },
  title: {
    color: "red",
    fontFamily: "LexendBold",
    fontSize: 25,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 0,
  },
});
