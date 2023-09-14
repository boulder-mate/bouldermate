import {
  TouchableHighlight,
  Text,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Progress from "react-native-progress";
import { useState } from "react";
import { ReactNativeFile } from "apollo-upload-client";

const UPLOAD_ROUTE = gql`
  mutation CreateRoute($route: RouteInput!) {
    createRoute(route: $route)
  }
`;

const ADD_PROJECT = gql`
  mutation AddProject($routeId: String!) {
    addProject(route_id: $routeId)
  }
`;

export const AddToProjects = ({ route_id }) => {
  const [addProject, addProjectResult] = useMutation(ADD_PROJECT);
  const [submitting, updateSubmitting] = useState(false);

  return (
    <TouchableHighlight
      style={[styles.headerButton, { backgroundColor: "green" }]}
      onPress={async () => {
        updateSubmitting(true);
        try {
          // Call the mutation
          var res: any = await addProject({
            variables: {
              routeId: route_id,
            },
          });

          // Handle the result if there were no issues calling the function
          if (res?.error) throw Error(`${res?.error.graphQlErrors}`);
        } catch (err) {
          console.log("Graphql route upload (or navigation) error:", err);
          Alert.alert(
            "Error",
            "An issue occurred creating this route. Please try again or notify BoulderMate support."
          );
          updateSubmitting(false);
        }
      }}
    >
      {submitting ? (
        <Progress.Circle color={"white"} size={25} indeterminate />
      ) : (
        <Text style={styles.buttonText}>Add to Projects +</Text>
      )}
    </TouchableHighlight>
  );
};

export const Upload = (routeObj) => {
  const [createRoute, result] = useMutation(UPLOAD_ROUTE);
  const [submitting, updateSubmitting] = useState(false);
  const navigation = useNavigation<any>();

  return (
    <TouchableHighlight
      style={[styles.headerButton, { backgroundColor: "green", width: 120 }]}
      onPress={async () => {
        updateSubmitting(true);
        try {
          // Create input object
          const route = {
            type: routeObj.type,
            colors: routeObj.colors,
            name: routeObj.name,
            image: new ReactNativeFile({
              name: `testimage.jpeg`,
              type: "image/jpeg",
              uri: routeObj.image,
            }),

            location: routeObj.location,
            routesetters: routeObj.routesetters,
            routesetter_grade: routeObj.grades?.routesetter, // Optional prop - can be null
            notes: routeObj.notes, // Optional prop - can be null
          };

          // Call the mutation
          console.log("Sending route to GQL");
          var res: any = await createRoute({
            variables: {
              route,
            },
          });

          // Handle the result if there were no issues calling the function
          if (res?.error) throw Error(`${res?.error.graphQlErrors}`);
          if (res?.data) {
            console.log(
              "Uploaded route successfully with response",
              res?.data?.createRoute
            );

            // result.data should simply be the id of the route
            navigation.navigate("RoutePage", {
              id: res?.data?.createRoute,
              headerButton: HeaderButtons.AddToProjects,
            });
          }
        } catch (err) {
          console.log("Graphql route upload (or navigation) error:", err);
          Alert.alert(
            "Error",
            "An issue occurred creating this route. Please try again or notify BoulderMate support."
          );
          updateSubmitting(false);
        }
      }}
    >
      {submitting ? (
        <Progress.Circle color={"white"} size={25} indeterminate />
      ) : (
        <>
          <Text style={styles.buttonText}>Upload</Text>
          <Ionicons name="cloud-upload" size={20} color="white" />
        </>
      )}
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
    maxWidth: 150,
    gap: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Lexend",
    color: "white",
    textAlignVertical: "center",
  },
});
