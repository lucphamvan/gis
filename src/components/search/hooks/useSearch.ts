import { useState, useEffect, useCallback } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getSuggestions } from "@/services/nominatim";

export const useSearch = () => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { open, onOpen, onClose } = useDisclosure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", search],
    queryFn: () => getSuggestions(search),
    enabled: !!search,
    refetchOnWindowFocus: false,
  });

  // Reset selected index when data changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [data]);

  const resetSearch = useCallback(() => {
    setSelectedIndex(-1);
    onClose();
  }, [onClose]);

  return {
    search,
    setSearch,
    selectedIndex,
    setSelectedIndex,
    open,
    onOpen,
    onClose,
    data,
    isLoading,
    error,
    resetSearch,
  };
};
