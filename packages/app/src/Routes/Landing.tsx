import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { RouteCard } from "./RouteCard";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Horizontal, LoadingScreen } from "../Utils/MiscComponents";
import * as Progress from "react-native-progress";

const GET_LOCATIONS = gql`
  query GetUserLocations {
    getUserLocations {
      last_updated
      name
      routes {
        active
        inactive
      }
      indoor
      image
      company
    }
  }
`;

const GET_ROUTES = gql`
  query GetRoutesById($ids: [String]!) {
    getRoutesById(ids: $ids) {
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
      ascents
      projects
    }
  }
`;

export const RoutesLanding = () => {
  const { data, loading, error } = useQuery(GET_LOCATIONS);
  const [getRoutesById, routesResult] = useLazyQuery(GET_ROUTES, {
    fetchPolicy: "no-cache",
  });
  const [locations, updateLocations] = useState(data?.getUserLocations || []);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [routes, setRoutes] = useState([]);

  const navigation = useNavigation<any>();

  // Query routes whenever we change a location!
  useEffect(() => {
    !!selectedLocation &&
      getRoutesById({
        variables: {
          ids: selectedLocation?.routes?.active || [],
        },
      }).then((result) => {
        if (result.error) console.log("Error fetching routes:", result.error);
        setRoutes(result.data?.getRoutesById || []);
      });
  }, [selectedLocation]);

  useEffect(() => {
    updateLocations(data?.getUserLocations || []);
  }, [data]);

  if (loading) return <LoadingScreen text={"Remembering your locations.."} />;
  if (error) {
    console.log(error);
    Alert.alert(
      "Sorry!",
      "We had a problem querying your saved locations. Please notify BoulderMate of this issue"
    );
  }

  console.log("routesResult.loading is", routesResult.loading);

  // Gym selection dropdown at top
  //  Gym recently viewed - store with async (last 5)
  //  Gym 'search' option at the bottom
  // Shows routes for selected gym
  //  Scrollable horizontal or vertical ???
  // Route filter button in header
  //  Route filter options
  return (
    <View style={styles.main}>
      <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
        <GymSelector
          location={selectedLocation}
          setLocation={setSelectedLocation}
          options={locations}
        />

        <TouchableHighlight
          style={styles.addRoute}
          onPress={() => navigation.navigate("RouteUpload")}
        >
          <Text style={styles.addRouteText}>Add route +</Text>
        </TouchableHighlight>
        <Horizontal style={{ marginTop: 10 }} />
      </View>
      {routesResult.loading ? (
        <View style={{}}>
          <LoadingScreen text={"Finding routes at " + selectedLocation.name} />
        </View>
      ) : (
        <RouteList routes={routes} gymName={selectedLocation?.name} />
      )}
    </View>
  );
};

const RouteList = ({ routes, gymName }) => {
  return (
    <ScrollView style={styles.cardsSection}>
      {routes.map((x) => (
        <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
          <RouteCard route={x} key={x._id} gym={gymName} />
        </View>
      ))}
    </ScrollView>
  );
};

const GymSelector = ({ location, setLocation, options }) => {
  const [open, setOpen] = useState(false);

  const items = options?.map((x: any, index) => {
    return {
      label: x.name,
      value: x,
    };
  });

  return (
    <DropDownPicker
      open={open}
      value={location}
      items={items}
      setOpen={setOpen}
      setValue={setLocation}
      setItems={() => {}}
      scrollViewProps={{
        nestedScrollEnabled: true,
        persistentScrollbar: true,
      }}
      listMode={"SCROLLVIEW"}
      mode="BADGE"
      dropDownContainerStyle={{
        borderWidth: 0.5,
      }}
      badgeColors={["#FF3131"]}
      badgeTextStyle={{ color: "white" }}
      dropDownDirection="BOTTOM"
      placeholder="Select Location"
      showBadgeDot={false}
      autoScroll
      style={styles.dropdownPicker}
      textStyle={styles.dropdownText}
    />
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    backgroundColor: "#EEE",
  },
  addRoute: {
    backgroundColor: "green",
    padding: 4,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "black",
  },
  addRouteText: {
    color: "white",
    fontFamily: "Lexend",
    fontSize: 18,
  },
  cardsSection: {
    height: Dimensions.get("window").height,
  },
  dropdownPicker: {
    height: 50,
    borderRadius: 5,
    elevation: 1,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
  },
  dropdownText: {
    color: "black",
    fontSize: 15,
    fontFamily: "LexendSemibold",
  },
});
