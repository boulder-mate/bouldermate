import { View, StyleSheet, Text, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const ProfileSummary = () => {
  const src = require("../../assets/images/climber.png");

  return (
    <View style={[styles.mainContainer, styles.userHeight]}>
      <View style={styles.nameAndLogo}>
        <Image source={src} style={styles.pfp} />
        <View style={styles.nameAndUser}>
          <Text style={styles.name}>Jonathon Cones</Text>
          <Text>@jonnocones</Text>
        </View>
      </View>
    </View>
  );
};

export const AnonSummary = () => {
  return (
    <View style={[styles.mainContainer, styles.anonHeight]}>
      <View style={styles.nameAndLogo}>
        <View style={styles.anon}>
          <MaterialCommunityIcons name="incognito-circle" size={50} />
        </View>
        <View style={styles.nameAndUser}>
          <Text style={styles.name}>Anonymous User</Text>
          <Text>Login to track your boulder progress!</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderColor: "black",
    borderWidth: 0.5,
    backgroundColor: "white",
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 15,
  },
  userHeight: {
    height: 100,
  },
  anonHeight: {
    height: 75,
  },
  nameAndLogo: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
    alignItems: "center",
  },
  nameAndUser: {
    flexDirection: "column",
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
  },
  pfp: {
    width: 50,
    height: 50,
    borderColor: "#AAA",
    borderWidth: 0.5,
    borderRadius: 25,
  },
  anon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});