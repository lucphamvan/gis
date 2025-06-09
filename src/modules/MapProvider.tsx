import { createContext, useContext } from "react";
import { Map } from "maplibre-gl";

interface MapContextProps {
  map: Map | null;
}
const MapContext = createContext<MapContextProps | null>(null);

interface MapProviderProps {
  children: React.ReactNode;
  map: Map | null;
}

const MapProvider = ({ children, map }: MapProviderProps) => {
  return <MapContext.Provider value={{ map }}>{children}</MapContext.Provider>;
};

const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};

export { MapProvider, useMap };
