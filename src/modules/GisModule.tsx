import { Container } from "@chakra-ui/react";
import { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Search from "@/components/search";
import { useEffect, useRef } from "react";

import { useMapStore } from "@/store";
import SelectStyle from "@/components/select-style";
import { MapStyleData } from "@/config/map";

const GisModule = () => {
  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const setMap = useMapStore((state) => state.setMap);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    mapRef.current = new Map({
      container: mapContainerRef.current,
      style: MapStyleData[0].url,
      center: [106.6297, 10.8231],
      zoom: 10,
      boxZoom: true,
    });

    setMap(mapRef);
  }, [mapRef, setMap]);

  return (
    <Container ref={mapContainerRef} p={0} bg="blue.500" maxW="full" w="full" h="full" position="relative">
      <Search />
      <SelectStyle />
    </Container>
  );
};

export default GisModule;
