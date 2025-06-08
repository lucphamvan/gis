import { useCallback } from "react";
import { useMap } from "react-map-gl/maplibre";
import type { Location } from "@/types/Location";

const DEFAULT_ZOOM = 17;

export const useMapNavigation = () => {
  const { current: map } = useMap();

  const navigateToLocation = useCallback(
    (location: Location) => {
      if (!map) return;

      const coordinates: [number, number] = [parseFloat(location.lon), parseFloat(location.lat)];

      map.flyTo({
        center: coordinates,
        zoom: DEFAULT_ZOOM,
        essential: true,
      });
    },
    [map]
  );

  return { navigateToLocation };
};
