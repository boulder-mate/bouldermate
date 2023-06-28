import { Route } from "common";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Climber = require("../../assets/images/climber.png");
let height = Dimensions.get("screen").height;

export const RouteMetadata = (route) => {
  return (
    <ScrollView style={{ height, overflow: "scroll" }}>
      <View style={styles.container}>
        {!route.active && (
          <View style={styles.section}>
            <View style={[styles.fieldLabel, { width: "100%" }]}>
              <Entypo
                name="squared-cross"
                size={20}
                color="red"
                style={{ width: 20, marginRight: "auto" }}
              />
              <Text style={[styles.fieldLabelText, { color: "red" }]}>
                This route is no longer active
              </Text>
            </View>
          </View>
        )}
        <MetadataField
          icon={
            <MaterialIcons
              style={{ marginRight: 2 }}
              name={"location-pin"}
              size={22}
            />
          }
          label="Gym"
          value={"Urban Climb Blackburn"}
        />
        <MetadataField
          icon={
            <Entypo
              name="tools"
              size={20}
              style={{ width: 20, marginRight: "auto" }}
            />
          }
          label="Routesetters"
          value={"Jonathon Brown, Jack Gilmore"}
        />
        <MetadataField
          icon={
            <Entypo
              name="back-in-time"
              size={20}
              style={{ width: 20, marginRight: "auto" }}
            />
          }
          label="DOB"
          value={"10th July 2023"}
        />
        <MetadataField
          icon={
            <Entypo
              name="arrow-long-up"
              size={18}
              style={{ width: 20, marginRight: "auto" }}
            />
          }
          label="Ascents"
          value={"48"}
        />
        <MetadataField
          label="Projects"
          value="573"
          icon={
            <Image
              source={Climber}
              style={{
                height: 27,
                width: 27,
              }}
            />
          }
        />
        <MetadataField
          icon={
            <FontAwesome
              name="user-secret"
              size={22}
              style={{ width: 20, marginRight: "auto" }}
            />
          }
          label="Routesetter Grade"
          value={"V7"}
        />
        <MetadataField
          icon={
            <FontAwesome
              name="users"
              size={18}
              style={{ width: 20, marginRight: "auto" }}
            />
          }
          label="Avg. User Grade"
          value="V7"
        />
        <MetadataField
          icon={
            <FontAwesome
              name="user"
              size={25}
              style={{ width: 20, marginRight: "auto" }}
            />
          }
          label="My Grade"
          value={"Add this as a project to grade this climb!"}
        />
        <View style={{ height: 550 }} />
      </View>
      
    </ScrollView>
  );
};

const MetadataField = ({ label, value, icon }) => {
  return (
    <View style={styles.section}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.fieldLabel}>
        <Text style={styles.fieldLabelText}>{label}</Text>
      </View>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    gap: 17,
    flexDirection: "column",
    alignContent: "space-between",
    overflow: "scroll",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fieldLabel: {
    width: "40%",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  fieldLabelText: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    flexWrap: "wrap",
  },
  fieldValue: {
    flex: 1,
    flexWrap: "wrap",
  },
  icon: {
    width: "6%",
    alignItems: "center",
  },
});
