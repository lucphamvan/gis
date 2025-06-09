const AppConfig = {
  MAP_STYLE_URL: import.meta.env.VITE_MAP_URL,
};

const getURL = (path: string) => AppConfig.MAP_STYLE_URL + path;

export interface MapStyle {
  id: string;
  name: string;
  url: string;
  imgSrc: string;
}

export const MapStyleData: MapStyle[] = [
  {
    id: "style2",
    name: "Liberty",
    url: getURL("/styles/osm/style.json"),
    imgSrc: getURL("/styles/osm/1/1/1.png"),
  },
  {
    id: "style1",
    name: "Default",
    url: getURL("/styles/default/style.json"),
    imgSrc: getURL("/styles/default/1/1/1.png"),
  },
  {
    id: "style3",
    name: "Fiord",
    url: getURL("/styles/fiord/style.json"),
    imgSrc: getURL("/styles/fiord/1/1/1.png"),
  },
];
