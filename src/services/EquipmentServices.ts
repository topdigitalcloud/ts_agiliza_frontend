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

//get Equipments of visible map area

const getVisibleEquipments = async (data: any, token: string) => {
  const config = requestConfig("POST", data, token);
  try {
    const res = await fetch(api + "/equipamentos/visiblelocations/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.error(error);
  }
};

//upload CSV equipments

const uploadEquipments = async (data: any, token: string) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(api + "/equipamentos/upload", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const EquipmentService = {
  getEquipamentos,
  getEquipamentosByLocation,
  getVisibleEquipments,
  uploadEquipments,
};

export default EquipmentService;
