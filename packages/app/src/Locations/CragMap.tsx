import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import MapView, { Marker } from "react-native-maps";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { LocationSummary } from "./LocationDrawer";
import Fontisto from "react-native-vector-icons/Fontisto";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { LoadingScreen } from "../Utils/MiscComponents";
import { useAuthData } from "../Auth/AuthProvider";
import * as Location from "expo-location";
import { getAsyncData, storeAsyncData } from "../Utils/AsyncStorage";

const GET_LOCATIONS = gql`
  query getLocations {
    getAllLocations {
      _id
      created
      last_updated
      name
      routes {
        active
        inactive
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
    }
  }
`;

const DEFAULT_COORDINATES = {
  latitude: -35,
  longitude: 140,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

export const CragMapRoot = () => {
  const [locations, setLocations] = useState<Array<any>>([]);
  const [coordinates, setCoordinates] = useState<any>();
  const [selectedLocation, setSelectedLocation] = useState<any | undefined>(
    undefined
  );
  const { loading, error, data, refetch } = useQuery(GET_LOCATIONS, {
    fetchPolicy: "no-cache",
  });

  // Auth data - includes user preferred region
  const user = useAuthData();

  // Drawer setup stuff
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = ["20%", "60%"];
  const drawerContent = (
    <LocationSummary
      location={selectedLocation}
      bottomSheetModalRef={bottomSheetModalRef}
    />
  );

  // Mapmarker press handler
  const handlePresentModalPress = useCallback((location: any) => {
    // Store this as the preferred user location
    storeAsyncData(
      "coordinates",
      JSON.stringify(location.metadata.coordinates)
    );
    setSelectedLocation(location);
    //bottomSheetModalRef.current?.present();
  }, []);

  // Set the state according to GQL response
  useEffect(() => {
    if (!!data && data.getAllLocations.length > 0) {
      setLocations(data.getAllLocations);
    }
  }, [data]);

  // Get the users most recently visited location to set as an initial focus point
  // This subverts the need for location services
  useEffect(() => {
    getAsyncData("coordinates").then((coords) => {
      console.log("Recalled most recent location at", coords);
      coords && setCoordinates(JSON.parse(coords));
    });
  }, []);

  // Handle the GraphQL response
  if (loading || !locations) {
    return <LoadingScreen text={"Finding crags..."} />;
  }

  if (error) {
    console.error("Error:", error);
    Alert.alert(
      "Whoops!",
      "We couldn't find any climbing spots.. please try again or notify BoulderMate"
    );
  }

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <CragMap
          data={locations}
          coordinates={coordinates}
          onSelectedLocation={(location) => handlePresentModalPress(location)}
        />
        <BottomSheetModal
          handleIndicatorStyle={styles.handleIndicatorStyle}
          backgroundStyle={styles.bottomSheetModalStyle}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onAnimate={() =>
            console.log("Selected location", selectedLocation.name)
          }
        >
          {drawerContent}
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

// The actual map itself
const CragMap = ({ data, coordinates, onSelectedLocation }) => {
  const initRegion = {
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    latitudeDelta: 1,
    longitudeDelta: 1,
  };
  const mapRef = useRef<MapView>(null);
  console.log("Should have", data?.length, "mapmarkers");

  const handleMarkerPress = (location) => {
    mapRef.current.animateToRegion({
      latitude: location.metadata.coordinates.lat,
      longitude: location.metadata.coordinates.lng,
      latitudeDelta: 0.25,
      longitudeDelta: 0.25,
    });
    onSelectedLocation(location);
  };

  return (
    <MapView
      ref={mapRef}
      style={{ left: 0, right: 0, top: 0, bottom: 0, position: "absolute" }}
      initialRegion={initRegion}
    >
      <Marker
        key={"YOLO"}
        title={"YOLO"}
        coordinate={{
          latitude: -35,
          longitude: 145,
        }}
        onPress={() => handleMarkerPress("bdhv")}
      >
        <Fontisto
          name="map-marker"
          color="#FF3131"
          size={40}
          style={styles.markerShadow}
        />
      </Marker>
      {data.map((x: any) => (
        <Marker
          key={x.name}
          title={x.name}
          coordinate={{
            latitude: x.metadata.coordinates.lat,
            longitude: x.metadata.coordinates.lng,
          }}
          onPress={() => handleMarkerPress(x)}
        >
          <Fontisto
            name="map-marker"
            color="#FF3131"
            size={40}
            style={styles.markerShadow}
          />
        </Marker>
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  bottomSheetModalStyle: {
    backgroundColor: "white",
  },
  handleIndicatorStyle: {
    backgroundColor: "red",
  },

  markerShadow: {
    shadowColor: "#333",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 1,
    elevation: 1,
  },
});
