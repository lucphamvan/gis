import { Box } from "@chakra-ui/react";
import type { Location } from "@/types/Location";

interface SearchResultItemProps {
  item: Location;
  index: number;
  isSelected: boolean;
  onItemClick: (item: Location, index: number) => void;
}

export const SearchResultItem = ({ item, index, isSelected, onItemClick }: SearchResultItemProps) => (
  <Box
    p="2"
    py="1"
    bg={isSelected ? "blue.100" : "transparent"}
    _hover={{ bg: "blue.100" }}
    cursor="pointer"
    fontSize="md"
    onMouseDown={() => onItemClick(item, index)}
  >
    {item.name}
  </Box>
);
