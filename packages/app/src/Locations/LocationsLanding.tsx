import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { gql, useQuery } from "@apollo/client";
import * as Progress from "react-native-progress";

const GET_LOCATIONS = gql`
  query GetAllLocations {
    getAllLocations {
      last_updated
      name
      routes {
        boulders
        ropes
      }
      metadata {
        address
        suburb
        state
        postcode
        country
        coordinates {
          lat
          lng
        }
      }
      indoor
      company
    }
  }
`;

export const LocationsLanding = () => {
  const navigation = useNavigation<any>();
  const { error, loading, data } = useQuery(GET_LOCATIONS);

  if (loading)
    return (
      <View>
        <Progress.Circle />
      </View>
    );

  return <View></View>;
};

const styles = StyleSheet.create({});
