import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet, Alert } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { DrawerHandle, LocationSummary } from "./LocationDrawer";
import Fontisto from "react-native-vector-icons/Fontisto";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { LoadingScreen } from "../Utils/MiscComponents";
import { useAuthData } from "../Auth/AuthProvider";
import { getAsyncData, storeAsyncData } from "../Utils/AsyncStorage";
import { min } from "math";

const GET_LOCATIONS = gql`
  query getLocations {
    getAllLocations {
      _id
      created
      last_updated
      name
      image
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

const DEFAULT_REGION = {
  latitude: -27.374481586572028,
  latitudeDelta: 67.86163255988238,
  longitude: 134.03028721301726,
  longitudeDelta: 43.079187046147524,
};

export const CragMapRoot = () => {
  const [locations, setLocations] = useState<Array<any>>([]);
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
  const snapPoints = ["41%", "60%"];
  const drawerContent = (
    <LocationSummary
      location={selectedLocation}
      bottomSheetModalRef={bottomSheetModalRef}
    />
  );

  // Mapmarker press handler
  const handlePresentModalPress = useCallback((location: any) => {
    // Store this as the preferred user location
    storeAsyncData("location", JSON.stringify(location));
    setSelectedLocation(location);
    bottomSheetModalRef.current?.present();
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
    getAsyncData("location").then((location) => {
      console.log("Recalled most recent location at", location);
      location && setSelectedLocation(JSON.parse(location));
    });
  }, []);

  // Handle the GraphQL response
  if (loading || !locations || locations.length === 0) {
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
          onSelectedLocation={(location) => handlePresentModalPress(location)}
          selectedLocation={selectedLocation}
        />
        <BottomSheetModal
          handleIndicatorStyle={styles.handleIndicatorStyle}
          handleComponent={(props) => (
            <DrawerHandle title={selectedLocation.name} />
          )}
          enablePanDownToClose
          backgroundStyle={styles.bottomSheetModalStyle}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
        >
          {drawerContent}
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

// The actual map itself
const CragMap = ({ data, onSelectedLocation, selectedLocation }) => {
  const initRegion = selectedLocation
    ? {
        latitude: selectedLocation?.metadata?.coordinates?.lat,
        longitude: selectedLocation?.metadata?.coordinates?.lng,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }
    : DEFAULT_REGION;

  const mapRef = useRef<MapView>(null);
  console.log("Should have", data?.length, "mapmarkers");

  const handleMarkerPress = (location) => {
    mapRef.current.animateToRegion({
      latitude: location.metadata.coordinates.lat - 0.05,
      longitude: location.metadata.coordinates.lng,
      latitudeDelta: 0.15,
      longitudeDelta: 0.15,
    });
    onSelectedLocation(location);
  };

  return (
    <View
      style={{ left: 0, right: 0, top: 0, bottom: 0, position: "absolute" }}
    >
      <MapView
        ref={mapRef}
        style={{ left: 0, right: 0, top: 0, bottom: 0, position: "absolute" }}
        initialRegion={initRegion}
      >
        {data.map((x: any) => (
          <Marker
            coordinate={{
              latitude: x.metadata.coordinates.lat,
              longitude: x.metadata.coordinates.lng,
            }}
            onPress={() => handleMarkerPress(x)}
            key={x._id}
          >
            <Fontisto
              name="map-marker"
              color="#FF3131"
              size={40}
              style={styles.markerShadow}
            />
            {x._id === selectedLocation?._id && (
              <View style={styles.markerLabel} />
            )}
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  bottomSheetModalStyle: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  handleIndicatorStyle: {
    backgroundColor: "#333",
  },

  markerShadow: {
    shadowColor: "#333",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 1,
    elevation: 1,
  },
  markerLabel: {
    position: "absolute",
    backgroundColor: "#000",
    width: 24,
    height: 24,
    borderRadius: 26 / 2,
    marginLeft: 3,
    marginTop: 4,
  },
});
