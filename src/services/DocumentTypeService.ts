//import { TDocType } from "../Interfaces/IDocType";
import { api, requestConfig } from "../utils/config";

//insert doc type
const insertDocType = async (data: any, token: string) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "/doctypes", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//update doc type
const updateDocType = async (data: any, token: string) => {
  const config = requestConfig("POST", data, token);
  try {
    const res = await fetch(api + "/doctypes/update", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Delete do type
const deleteDocType = async (id: string, token: string) => {
  const config = requestConfig("DELETE", null, token);
  try {
    const res = await fetch(api + "/doctypes/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get all doc type of user
const getDocTypes = async (token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/doctypes", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.error(error);
  }
};

//get a doc type of user
const getDocTypeById = async (id: string, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/doctypes/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.error(error);
  }
};

const DocumentTypeService = {
  insertDocType,
  updateDocType,
  deleteDocType,
  getDocTypes,
  getDocTypeById,
};

export default DocumentTypeService;
