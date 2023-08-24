import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { RouteCard } from "./RouteCard";

export const RoutesLanding = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.main}>
      <TouchableHighlight
        style={styles.addRoute}
        onPress={() => navigation.navigate("RouteUpload")}
      >
        <Text style={styles.addRouteText}>Add route +</Text>
      </TouchableHighlight>
      <View style={styles.cardsSection}>
        <RouteCard />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 10,
  },
  addRoute: {
    backgroundColor: "green",
    padding: 4,
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  addRouteText: {
    color: "white",
    fontFamily: "Lexend",
    fontSize: 20,
  },
  cardsSection: {
    paddingVertical: 10,
  },
});