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
  mutation CreateRoute($image: Upload!) {
    createRoute(image: $image)
  }
`;

export const AddToProjects = () => {
  return (
    <TouchableHighlight
      style={[styles.headerButton, { backgroundColor: "green" }]}
    >
      <Text style={styles.buttonText}>Add to Projects +</Text>
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
              name: `testimage.png`,
              type: "image/png",
              uri: routeObj.image.uri,
            }),

            location: routeObj.location,
            routesetters: routeObj.routesetters,
            routesetter_grade: routeObj.grades?.routesetter, // Optional prop - can be null
            notes: routeObj.notes, // Optional prop - can be null
          };
          console.log("Uploading object", route);

          const image = route.image;

          // Call the mutation
          await createRoute({
            variables: {
              image,
            },
          });

          // Handle the result if there were no issues calling the function
          if (result.error) throw Error(`${result.error}`);
          if (result.data) {
            // result.data should simply be the id of the route
            navigation.navigate("RoutePage", {
              routeObj,
              headerButton: HeaderButtons.AddToProjects,
            }); // Pass in the id and route for a faster page
          }
        } catch (err) {
          console.log("Graphql route upload error:", err);
          Alert.alert(
            "Error",
            "An error occurred creating the route. Please notify BoulderMate support."
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
