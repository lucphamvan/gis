import { useCallback } from "react";
import type { Location } from "@/types/Location";
import { useMapStore } from "@/store";

const DEFAULT_ZOOM = 15;

export const useMapNavigation = () => {
  const map = useMapStore((state) => state.map);

  const navigateToLocation = useCallback(
    (location: Location) => {
      console.log("Navigating to location:", map, location);
      if (!map.current) return;

      const coordinates: [number, number] = [parseFloat(location.lon), parseFloat(location.lat)];

      map.current.flyTo({
        center: coordinates,
        zoom: DEFAULT_ZOOM,
        essential: true,
      });
    },
    [map]
  );

  return { navigateToLocation };
};
