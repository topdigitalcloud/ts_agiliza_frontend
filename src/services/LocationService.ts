import { api, requestConfig } from "../utils/config";

//get All Locations

const getLocations = async (token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/locations", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.error(error);
  }
};

const LocationService = {
  getLocations,
};

export default LocationService;
