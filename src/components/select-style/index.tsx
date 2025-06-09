import { MapStyleData } from "@/config/map";
import { Center, HStack, Image, Show } from "@chakra-ui/react";

import Item from "./item";
import { useMapStore } from "@/store";
import { useCallback, useState } from "react";
import LayerImg from "@/assets/layer.svg";

const SelectStyle = () => {
  const { current: map } = useMapStore((state) => state.map);
  const [show, setShow] = useState(false);

  const handleChangeStyle = useCallback(
    (styleUrl: string) => {
      if (!map) return;
      map.setStyle(styleUrl);
      setShow(false);
    },
    [map]
  );

  return (
    <HStack pos="absolute" bottom={4} left={4} zIndex={100} onMouseLeave={() => setShow(false)} height="75px">
      <Center
        bg="white"
        rounded="md"
        onMouseEnter={() => setShow(true)}
        onClick={() => setShow(!show)}
        cursor="pointer"
        shadow="lg"
        height="75px"
        width="75px"
        flexDir="column"
      >
        <Image src={LayerImg} width="60px" height="60px" />
      </Center>
      <Show when={show}>
        <HStack bg="white" borderRadius="md" boxShadow="md" gap="4" px={4} pt="2" height="75px">
          {MapStyleData.map((item) => (
            <Item key={item.id} item={item} handleChangeStyle={handleChangeStyle} />
          ))}
        </HStack>
      </Show>
    </HStack>
  );
};

export default SelectStyle;
