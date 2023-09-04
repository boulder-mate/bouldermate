import { Route } from "common";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
  Alert,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { RoutePageHeader } from "./RoutePageHeader";
import { RouteMetadata } from "./RouteMetadata";
import { LinearGradient } from "expo-linear-gradient";
import { RouteDiscussion } from "./RouteDiscussion";
import * as Progress from "react-native-progress";

const GET_ROUTE = gql`
  query GetRouteById($id: String!) {
    getRouteById(id: $id) {
      _id
      created
      last_updated
      type
      grades {
        routesetter {
          type
          value
        }
        user {
          type
          value
        }
      }
      colors
      name
      routesetters
      active
      image
      location
    }
  }
`;

let height = Dimensions.get("screen").height;

// Input refers to react native route, not the object
export const RoutePage = ({ route }) => {
  var routeObj = route.params.routeObj;
  var routeId = route.params.id;
  var headerButton = route.params.headerButton;
  var preview = route.params.isPreview || false;

  // Can handle id or route input.
  if (routeObj) {
    console.log("Received RoutePage with object");
    return (
      <RoutePageByObject
        routeObj={routeObj}
        headerButton={headerButton}
        isPreview={preview}
      />
    );
  } else if (routeId) {
    return <RoutePageById id={routeId} headerButton={headerButton} />;
  }
};

const RoutePageById = ({ id, headerButton }) => {
  // Use the id to query, then just return a RoutePageByObject
  const { loading, data, error } = useQuery(GET_ROUTE, {
    variables: {
      id,
    },
  });

  // Handle the possible query states
  if (loading)
    return (
      <View style={styles.loadingPage}>
        <Progress.Circle color={"white"} size={25} indeterminate />
      </View>
    );
  if (error) {
    console.log("GraphQL query error:", error);
    Alert.alert(
      "Error",
      "An issue occurred loading this route. Please try again or notify BoulderMate support."
    );
    return <View />;
  } else
    return (
      <RoutePageByObject
        routeObj={data.getRouteById}
        headerButton={headerButton}
      />
    );
};

const RoutePageByObject = ({ routeObj, headerButton, isPreview = false }) => {
  const [selected, updateSelected] = useState("Details");

  // Default page
  return (
    <View style={styles.container}>
      <LinearGradient start={{ x: 0.5, y: 0.5 }} colors={["#FFF", "#EEE"]}>
        <RoutePageHeader route={routeObj}>{headerButton()}</RoutePageHeader>

        <SectionSelector selected={selected} updateSelected={updateSelected} />
        {selected === "Disc" ? (
          <RouteDiscussion />
        ) : (
          <RouteMetadata route={routeObj} />
        )}
      </LinearGradient>
    </View>
  );
};

const SectionSelector = ({ selected, updateSelected }) => {
  return (
    <View style={styles.selector}>
      <TouchableHighlight
        style={
          selected === "Details"
            ? styles.selected
            : [
                styles.selection,
                { borderBottomRightRadius: 15, borderRightWidth: 0.5 },
              ]
        }
        onPress={() => updateSelected("Details")}
      >
        <Text
          style={
            selected === "Details" ? styles.selectionText : styles.selectedText
          }
        >
          Details
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={
          selected === "Disc"
            ? styles.selected
            : [
                styles.selection,
                { borderBottomLeftRadius: 15, borderLeftWidth: 0.5 },
              ]
        }
        onPress={() => updateSelected("Disc")}
      >
        <Text
          style={
            selected === "Disc" ? styles.selectionText : styles.selectedText
          }
        >
          Discussion
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "scroll",
    height,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 45,
  },
  selectedText: {
    fontSize: 15,
    fontFamily: "Lexend",
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    color: "white",
  },
  selectionText: {
    fontSize: 15,
    fontFamily: "Lexend",
  },
  selection: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3131",
    borderBottomWidth: 0.5,
  },
  selected: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
