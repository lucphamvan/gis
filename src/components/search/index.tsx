import type { Location } from "@/types/Location";
import { Input, Box, Show, Stack } from "@chakra-ui/react";
import { useCallback } from "react";
import { useSearch } from "./hooks/useSearch";
import { useMapNavigation } from "./hooks/useMapNavigation";
import { SEARCH_CONFIG, type KeyboardKey } from "./constants";
import { SearchResultItem } from "./components/SearchResultItem";

const Search = () => {
  const { search, setSearch, selectedIndex, setSelectedIndex, open, onOpen, onClose, data, resetSearch } = useSearch();

  const { navigateToLocation } = useMapNavigation();

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
    },
    [setSelectedIndex, selectLocation]
  );

  const hasResults = data && data.length > 0;
  const shouldShowResults = open && search && hasResults;

  return (
    <Box position="absolute" top={4} left={4} zIndex={1000} width={SEARCH_CONFIG.WIDTH}>
      <Input
        bg="white"
        placeholder={SEARCH_CONFIG.PLACEHOLDER}
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        onBlur={resetSearch}
        onClick={onOpen}
      />
      <Show when={shouldShowResults}>
        <Stack bg="white" borderRadius="md" boxShadow="md" maxHeight={SEARCH_CONFIG.MAX_HEIGHT} overflowY="auto">
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
