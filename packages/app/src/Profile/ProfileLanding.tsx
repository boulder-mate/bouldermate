import { useUser } from "@realm/react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ProfileSummary } from "./ProfileSummary";

export const ProfileLanding = () => {
  return (
    <View style={styles.landingContainer}>
      <ProfileSummary />
      <LogoutButton />
    </View>
  );
};

export const LogoutButton = () => {
  const user = useUser();

  return (
    <TouchableHighlight
      style={styles.logoutContainer}
      onPress={() => user.logOut()}
    >
      <>
        <Text style={styles.logoutText}>Logout</Text>
        <MaterialIcons name="logout" size={16} color="white" />
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
    backgroundColor: "#FF3131",
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 5,
    marginTop: "auto",
  },
  landingContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 125,
  },
  logoutText: {
    fontSize: 18,
    color: "white",
  },
});
