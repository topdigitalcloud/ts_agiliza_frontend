import { api, requestConfig } from "../utils/config";

//get All Stations

const getStations = async (token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/stations", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.error(error);
  }
};

//getStationsByLocation
const getStationsByLocation = async (id: string, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/stations/location/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.error(error);
  }
};

//getStationByID
const getStationById = async (id: string | undefined, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/stations/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.error(error);
  }
};

//get Stations of visible map area
const getVisibleStations = async (data: any, token: string) => {
  const config = requestConfig("POST", data, token);
  try {
    const res = await fetch(api + "/stations/visiblelocations/", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.error(error);
  }
};

//set Label for Station
const setLabelStation = async (data: any, token: string) => {
  const config = requestConfig("POST", data, token);
  console.log(data);
  try {
    const res = await fetch(api + "/stations/labelstation", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//upload CSV of Stations and Systems
const uploadStations = async (data: any, token: string) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(api + "/stations/upload", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const StationService = {
  getStations,
  getStationsByLocation,
  getVisibleStations,
  uploadStations,
  getStationById,
  setLabelStation,
};

export default StationService;
