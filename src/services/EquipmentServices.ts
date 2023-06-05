import { api, requestConfig } from "../utils/config";

//get All Equipamentos

const getEquipamentos = async (token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/equipamentos", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.error(error);
  }
};

//getAllEquipamentosByLocation

const getEquipamentosByLocation = async (id: string, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/equipamentos/location/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.error(error);
  }
};

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

const EquipmentService = {
  getEquipamentos,
  getLocations,
  getEquipamentosByLocation,
};

export default EquipmentService;
