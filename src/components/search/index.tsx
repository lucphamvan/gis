import { getSuggestions } from "@/services/nominatim";
import { Input, Box, Show, useDisclosure, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const { open, onOpen, onClose } = useDisclosure();

  const { data } = useQuery({
    queryKey: ["search", search],
    queryFn: () => getSuggestions(search),
    enabled: !!search,
    refetchOnWindowFocus: false,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    onOpen();
  };

  return (
    <Box position="absolute" top={4} left={4} zIndex={1000} width="300px">
      <Input
        bg="white"
        placeholder="Search GisMap"
        value={search}
        onChange={handleSearchChange}
        onBlur={() => onClose()}
        onClick={() => onOpen()}
      />
      <Show when={open && !!search}>
        <Stack p="4" bg="white" borderRadius="md" boxShadow="md" maxHeight="300px" overflowY="auto">
          {data?.map((item, index) => {
            return <Box key={`item${index}`}>{item.name}</Box>;
          })}
        </Stack>
      </Show>
    </Box>
  );
};

export default Search;
