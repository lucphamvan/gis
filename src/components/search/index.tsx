import type { Location } from "@/types/Location";
import { Input, Box, Show, Stack, InputGroup, Icon } from "@chakra-ui/react";
import { useCallback } from "react";
import { useSearch } from "./hooks/useSearch";
import { useMapNavigation } from "./hooks/useMapNavigation";
import { SEARCH_CONFIG, type KeyboardKey } from "./constants";
import SearchResultItem from "./components/SearchResultItem";
import { MdSearch, MdClose } from "react-icons/md";
import { useMapStore } from "@/store";

const Search = () => {
  const { search, setSearch, selectedIndex, setSelectedIndex, open, onOpen, onClose, data, resetSearch } = useSearch();
  const { navigateToLocation } = useMapNavigation();
  const { current: map } = useMapStore((state) => state.map);

  const drawMarker = useCallback(
    async (location: Location) => {
      if (!map) return;

      // Remove existing marker layer if it exists
      if (map.getLayer("marker-layer")) {
        map.removeLayer("marker-layer");
      }
      if (map.getSource("markers")) {
        map.removeSource("markers");
      }

      const image = await map.loadImage("/eth.png");
      map.addImage("vite", image.data, { pixelRatio: 2 });
      map.addSource("markers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [parseFloat(location.lon), parseFloat(location.lat)] },
              properties: { title: location.display_name, description: "Best food in town" },
            },
          ],
        },
      });

      map.addLayer({
        id: "marker-layer",
        type: "symbol",
        source: "markers",
        layout: {
          "icon-image": "vite",
          "icon-size": 1,
          "icon-overlap": "always",
          "text-field": ["get", "title"],
          "text-offset": [0, 1],
          "text-size": 13,
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#c11515",
        },
      });
    },
    [map]
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      onOpen();
    },
    [setSearch, onOpen]
  );

  const selectLocation = useCallback(
    (location: Location) => {
      setSearch(location.display_name);
      navigateToLocation(location);
      onClose();
    },
    [setSearch, navigateToLocation, onClose]
  );

  // handle keyboard navigation
  // ArrowDown, ArrowUp, Enter, Escape
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!data || data.length === 0) return;

      const keyHandlers: Record<KeyboardKey, () => void> = {
        ArrowDown: () => {
          event.preventDefault();
          setSelectedIndex((prev) => (prev < data.length - 1 ? prev + 1 : prev));
        },
        ArrowUp: () => {
          event.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        },
        Enter: () => {
          event.preventDefault();
          if (selectedIndex >= 0 && data[selectedIndex]) {
            selectLocation(data[selectedIndex]);
          }
        },
        Escape: () => {
          resetSearch();
        },
      };

      const handler = keyHandlers[event.key as KeyboardKey];
      handler?.();
    },
    [data, selectedIndex, setSelectedIndex, selectLocation, resetSearch]
  );

  const handleItemClick = useCallback(
    (item: Location, index: number) => {
      setSelectedIndex(index);
      selectLocation(item);
      drawMarker(item);
    },
    [setSelectedIndex, selectLocation, drawMarker]
  );

  const hasResults = data && data.length > 0;
  const shouldShowResults = open && search && hasResults;
  const showClearIcon = search.length > 0 && !open;

  return (
    <Box position="absolute" top={4} left={4} zIndex={1000} width={SEARCH_CONFIG.WIDTH}>
      <InputGroup
        startElement={<MdSearch size={18} />}
        endElement={
          showClearIcon ? (
            <Icon
              as={MdClose}
              boxSize={5}
              _hover={{ color: "blue.600" }}
              cursor="pointer"
              onClick={() => setSearch("")}
            />
          ) : null
        }
        position="relative"
      >
        <Input
          bg="white"
          placeholder={SEARCH_CONFIG.PLACEHOLDER}
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onBlur={resetSearch}
          onClick={onOpen}
        />
      </InputGroup>
      <Show when={shouldShowResults}>
        <Stack bg="white" borderRadius="md" boxShadow="md" py="2">
          {data?.map((item, index) => (
            <SearchResultItem
              key={`item-${index}`}
              item={item}
              index={index}
              isSelected={selectedIndex === index}
              onItemClick={handleItemClick}
            />
          ))}
        </Stack>
      </Show>
    </Box>
  );
};

export default Search;
