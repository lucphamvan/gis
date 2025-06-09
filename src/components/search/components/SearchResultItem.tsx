import { Box, Flex, Icon } from "@chakra-ui/react";
import type { Location } from "@/types/Location";
import React from "react";
import { MdLocationOn } from "react-icons/md";

interface SearchResultItemProps {
  item: Location;
  index: number;
  isSelected: boolean;
  onItemClick: (item: Location, index: number) => void;
}

const SearchResultItem = ({ item, index, isSelected, onItemClick }: SearchResultItemProps) => (
  <Box
    p="2"
    py="2"
    bg={isSelected ? "blue.100" : "transparent"}
    _hover={{ bg: "blue.100" }}
    cursor="pointer"
    fontSize="md"
    onMouseDown={() => onItemClick(item, index)}
    as={Flex}
    alignItems="center"
  >
    <Icon as={MdLocationOn} boxSize={5} mr="2" color={"gray.500"} />
    <Box truncate>{item.display_name}</Box>
  </Box>
);

export default React.memo(SearchResultItem);
