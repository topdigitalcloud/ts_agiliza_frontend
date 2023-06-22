import { api, requestConfig } from "../utils/config";

//get All Systems
const getSystems = async (token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/systems", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.error(error);
  }
};

//get systemns that belong to station
const getSystemsByStation = async (data: any, token: string) => {
  const config = requestConfig("POST", data, token);
  try {
    const res = await fetch(api + "/systems/station/", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.error(error);
  }
};

//set Label for System
const setLabelSystem = async (data: any, token: string) => {
  const config = requestConfig("POST", data, token);
  console.log(data);
  try {
    const res = await fetch(api + "/systems/labelsystem", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//getEquipamentsByID
const getSystemById = async (id: string | undefined, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/systems/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const SystemService = {
  getSystems,
  getSystemsByStation,
  getSystemById,
  setLabelSystem,
};

export default SystemService;
