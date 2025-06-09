import type { Map } from "maplibre-gl";
import type { RefObject } from "react";
import { create } from "zustand";

type StoreState = {
  map: RefObject<Map | null>;
  setMap: (map: RefObject<Map | null>) => void;
};

export const useMapStore = create<StoreState>((set) => ({
  map: { current: null },
  setMap: (map) => set({ map }),
}));
