import { getSuggestions } from "@/services/nominatim";
import type { Location } from "@/types/Location";
import { Input, Box, Show, useDisclosure, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { open, onOpen, onClose } = useDisclosure();

  const { data } = useQuery({
    queryKey: ["search", search],
    queryFn: () => getSuggestions(search),
    enabled: !!search,
    refetchOnWindowFocus: false,
  });

  // Reset selected index when data changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    onOpen();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!data || data.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex((prev) => (prev < data.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        event.preventDefault();
        if (selectedIndex >= 0 && data[selectedIndex]) {
          // Handle selection here - you can add your selection logic
          console.log("Selected:", data[selectedIndex]);
          onClose();
        }
        break;
      case "Escape":
        onClose();
        setSelectedIndex(-1);
        break;
    }
  };

  const handleItemClick = (item: Location, index: number) => {
    setSelectedIndex(index);
    onClose();
    console.log("Item clicked:", item);
  };

  return (
    <Box position="absolute" top={4} left={4} zIndex={1000} width="300px">
      <Input
        bg="white"
        placeholder="Search GisMap"
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        onBlur={() => onClose()}
        onClick={() => onOpen()}
      />
      <Show when={open && !!search}>
        <Stack bg="white" borderRadius="md" boxShadow="md" maxHeight="300px" overflowY="auto">
          {data?.map((item, index) => {
            return (
              <Box
                p="2"
                py="1"
                key={`item${index}`}
                bg={selectedIndex === index ? "blue.100" : "transparent"}
                _hover={{ bg: "blue.100" }}
                cursor="pointer"
                onClick={() => handleItemClick(item, index)}
              >
                {item.name}
              </Box>
            );
          })}
        </Stack>
      </Show>
    </Box>
  );
};

export default Search;
