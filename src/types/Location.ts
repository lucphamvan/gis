export interface Location {
  name: string;
  lat: string;
  lon: string;
  displayName: string;
  geojson: GeoJson;
  address: Address;
}

type Coordinate = [number, number];
type Polygon = Coordinate[][];

interface GeoJson {
  type: string;
  coordinates: Coordinate | Coordinate[] | Polygon;
}

export interface Address {
  amenity?: string;
  road?: string;
  quarter?: string;
  suburb?: string;
  city: string;
  "ISO3166-2-lvl4"?: string;
  postcode?: string;
  country: string;
  country_code: string;
}
