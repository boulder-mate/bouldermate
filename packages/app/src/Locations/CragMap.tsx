import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import MapView, { Marker, Camera, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
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
  const [selectedLocation, setSelectedLocation] = useState<any | undefined>(
    undefined
  );
  const { loading, error, data, refetch } = useQuery(GET_LOCATIONS, {
    fetchPolicy: "no-cache",
  });

  // Auth data
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
    setSelectedLocation(location);
    bottomSheetModalRef.current?.present();
  }, []);

  // Set the state according to GQL response
  useEffect(() => {
    if (data && data.locationsApi.length > 0) {
      setLocations(data.locationsApi);
    } else {
      refetch({ fetchPolicy: "no-cache" });
    }
  }, [data]);

  // Handle the GraphQL response
  if (loading || !locations) {
    return <LoadingScreen text={"Finding crags..."} />;
  }

  if (locations.length === 0 || error) {
    console.error("Error:", error);
    Alert.alert(
      "Whoops!",
      "We couldn't find any climbing spots.. please try again or notify BoulderMate"
    );
    refetch();
  }

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <CragMap
          data={locations}
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
const CragMap = ({ data, onSelectedLocation }) => {
  const mapRef = useRef<MapView>(null);

  return (
    <MapView
      ref={mapRef}
      style={{ left: 0, right: 0, top: 0, bottom: 0, position: "absolute" }}
      initialRegion={DEFAULT_COORDINATES}
      provider={PROVIDER_GOOGLE}
    >
      {data.map((x: any) => {
        return (
          <Marker
            key={x._id}
            coordinate={{
              latitude: x.coordinates.lat,
              longitude: x.coordinates.lng,
            }}
            onPress={() => onSelectedLocation(x)}
          >
            <Fontisto
              name="map-marker"
              color="#2fdce1"
              size={40}
              style={styles.markerShadow}
            />
          </Marker>
        );
      })}
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
    backgroundColor: "#000",
  },
});
