import type { MapStyle } from "@/config/map";
import { Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

interface ItemProps {
  item: MapStyle;
  handleChangeStyle: (styleUrl: string) => void;
}

const Item = ({ item, handleChangeStyle }: ItemProps) => {
  return (
    <Stack gap="0" p="0">
      <Image
        src={item.imgSrc}
        height="44px"
        width="44px"
        onClick={() => handleChangeStyle(item.url)}
        borderRadius="md"
        cursor="pointer"
        _hover={{ border: "2px solid blue" }}
      />
      <Text fontSize="13px" textAlign="center" color="gray.600">
        {item.name}
      </Text>
    </Stack>
  );
};

export default React.memo(Item);
