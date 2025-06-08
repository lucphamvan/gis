import { Container } from "@chakra-ui/react";
import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import Search from "@/components/search";

const GisModule = () => {
  return (
    <Container p={0} bg="blue.500" maxW="full" w="full" h="100vh" position="relative">
      <Map
        initialViewState={{
          longitude: 106.6297,
          latitude: 10.8231,
          zoom: 10,
        }}
        boxZoom={true}
        style={{ width: "100%", height: "100%" }}
        mapStyle="http://localhost:8080/styles/osm/style.json"
      >
        <Search />
      </Map>
    </Container>
  );
};

export default GisModule;
