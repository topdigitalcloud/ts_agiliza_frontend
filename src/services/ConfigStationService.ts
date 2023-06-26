import { api, requestConfig } from "../utils/config";

//get All Equipamentos

const getConfig = async (token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/configstations", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.error(error);
  }
};

//get visible fields customized by user
const getVisibleFields = async (token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/configstations/visible", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.error(error);
  }
};

//getAllEquipamentosByLocation

const setConfig = async (configs: any, token: string) => {
  const config = requestConfig("PUT", configs, token);
  try {
    const res = await fetch(api + "/configstations", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const ConfigStationService = {
  getConfig,
  setConfig,
  getVisibleFields,
};

export default ConfigStationService;
