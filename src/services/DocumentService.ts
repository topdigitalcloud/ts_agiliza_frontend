import { api, requestConfig } from "../utils/config";

const insertDoc = async (data: any, token: string) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(api + "/documents", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//PUT
const updateDoc = async (data: any, token: string) => {
  const config = requestConfig("PUT", data, token);
  try {
    const res = await fetch(api + "/documents", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Delete
const deleteDoc = async (id: string, token: string) => {
  const config = requestConfig("DELETE", null, token);
  try {
    const res = await fetch(api + "/documents/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get
const getAllDocs = async (token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/documents", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.error(error);
  }
};

//Get
const getDocById = async (id: string, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/documents/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.error(error);
  }
};

//Get
const getEquipmentDocs = async (id: string | undefined, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/documents/equipment/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const DocumentService = {
  insertDoc,
  updateDoc,
  deleteDoc,
  getAllDocs,
  getDocById,
  getEquipmentDocs,
};

export default DocumentService;
