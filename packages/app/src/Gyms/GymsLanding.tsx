import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

export const GymsLanding = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.main}>
      <TouchableHighlight
        style={styles.addRoute}
        onPress={() => navigation.navigate("RouteUpload")}
      >
        <Text style={styles.addRouteText}>Add route +</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 10,
  },
  addRoute: {
    backgroundColor: "#044fd1",
    padding: 4,
    alignItems: "center",
    borderRadius: 10,
  },
  addRouteText: {
    color: "white",
    fontFamily: "Lexend",
    fontSize: 20,
  },
});
