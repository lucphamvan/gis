import api from "@/config/api";
import { type Location } from "@/types/Location";

export const getSuggestions = async (query: string) => {
  try {
    const response = await api.get<Location[]>("/search", {
      params: {
        q: query,
        format: "json",
        addressdetails: 1,
        limit: 10,
        polygon_geojson: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
};
