import { Route } from "common";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { RoutePageHeader } from "./RoutePageHeader";

let width = Dimensions.get("screen").width;

export const RoutePage = () => {
  return (
    <View>
      <RoutePageHeader />
      <RouteMetadata />
    </View>
  );
};

const RouteMetadata = (route) => {
  return (
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
              This route is no longer active :(
            </Text>
          </View>
        </View>
      )}
      <View style={styles.section}>
        <View style={styles.fieldLabel}>
          <Entypo
            name="tools"
            size={20}
            style={{ width: 20, marginRight: "auto" }}
          />
          <Text style={styles.fieldLabelText}>Routesetters</Text>
        </View>
        <Text style={styles.fieldValue}>Jonathon Brown, Jack Gilmore</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.fieldLabel}>
          <Entypo
            name="back-in-time"
            size={20}
            style={{ width: 20, marginRight: "auto" }}
          />
          <Text style={styles.fieldLabelText}>DOB</Text>
        </View>
        <Text style={styles.fieldValue}>10th July 2023</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.fieldLabel}>
          <Entypo
            name="arrow-long-up"
            size={18}
            style={{ width: 20, marginRight: "auto" }}
          />
          <Text style={styles.fieldLabelText}>Ascents</Text>
        </View>
        <Text style={styles.fieldValue}>1093 (2014 in progress)</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.fieldLabel}>
          <FontAwesome
            name="user-secret"
            size={22}
            style={{ width: 20, marginRight: "auto" }}
          />
          <Text style={styles.fieldLabelText}>Routesetter Grade</Text>
        </View>
        <Text style={styles.fieldValue}>V7</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.fieldLabel}>
          <FontAwesome
            name="users"
            size={18}
            style={{ width: 20, marginRight: "auto" }}
          />
          <Text style={styles.fieldLabelText}>Average User Grade</Text>
        </View>
        <Text style={styles.fieldValue}>V7</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.fieldLabel}>
          <FontAwesome
            name="user"
            size={25}
            style={{ width: 20, marginRight: "auto" }}
          />
          <Text style={styles.fieldLabelText}>My Grade</Text>
        </View>
        <Text style={styles.fieldValue}>
          Add this as a project to grade this climb!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    gap: 15,
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
});
