import { createContext, useContext, useState, useEffect } from "react";
import * as Location from "expo-location";

const LocationContext = createContext<any>(null);
export function ProvideLocation({ children }: any) {
  return (
    <LocationContext.Provider value={useProvideLocation()}>
      {children}
    </LocationContext.Provider>
  );
}

export const useCurrentLocation = () => {
  return useContext(LocationContext);
};

function useProvideLocation() {
  const [coordinates, setCoordinates] = useState<any | null>(null);
  

  return { coordinates };
}
