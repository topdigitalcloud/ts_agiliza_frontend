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

//getEquipamentsByID
const getMapSate = async (token: string) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await fetch(api + "/locations/map", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.error(error);
  }
};

//getEquipamentsByID
const setMapSate = async (data: any | undefined, token: string) => {
  const config = requestConfig("POST", data, token);
  try {
    const res = await fetch(api + "/locations/map", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.error(error);
  }
};

//setPageFromMap
const setPageFromMap = async (data: number, token: string) => {
  const config = requestConfig("POST", data, token);
  try {
    const res = await fetch(api + "/locations/page", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.error(error);
  }
};

//getEquipamentsByID
const getPageFromMap = async (token: string) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await fetch(api + "/locations/page", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const LocationService = {
  getLocations,
  setMapSate,
  getMapSate,
  setPageFromMap,
  getPageFromMap,
};

export default LocationService;
