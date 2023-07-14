import { Route } from "common";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";

import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Climber = require("../../assets/images/climber.png");
let height = Dimensions.get("screen").height;

export const RouteMetadata = ({ route }) => {
  return (
    <ScrollView style={{ height, overflow: "scroll" }} persistentScrollbar>
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
          value={route.location}
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
          value={route.routesetters.join(", ")}
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
          value={moment(new Date(route.created)).format("DD[th] MMMM YYYY")}
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
          value={route.ascents || 0}
        />
        <MetadataField
          label="Projects"
          value={route.projects || 0}
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
          value={route.grades.routesetter.value || "N/A"}
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
          value={(route.grades.user && route.grades.user[0]?.value) || "N/A"}
          // value={route.grades.user && route.grades.user[0]?.value} This will take some further care
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
        {route.notes && (
          <MetadataField
            icon={
              <Entypo
                name="tools"
                size={20}
                style={{ width: 20, marginRight: "auto" }}
              />
            }
            label="Routesetter Notes"
            value={route.notes}
          />
        )}
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
