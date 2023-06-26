import { TDocument } from "../Interfaces/IDocument";
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

//Get document by ID
const getDocById = async (data: any, token: string) => {
  const config = requestConfig("POST", data, token);
  try {
    const res = await fetch(api + "/documents/show", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//post
const getSystemDocs = async (data: any, token: string) => {
  const config = requestConfig("POST", data, token);
  try {
    const res = await fetch(api + "/documents/system", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get
const getStationDocs = async (id: string | undefined, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/documents/station/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.error(error);
  }
};

//Get
const downloadDoc = async (doc: TDocument | undefined, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/documents/download/" + doc?._id, config)
      .then((res) =>
        res.blob().then((blob) => {
          // Creating new object of PDF/DOC file
          const fileURL = window.URL.createObjectURL(blob);
          // Setting various property values
          let alink = document.createElement("a");
          alink.href = fileURL;
          const fileName = doc?.title
            .replace(/ /g, "_")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase();
          alink.download = fileName + doc!.extension;
          alink.click();
        })
      )
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
  getStationDocs,
  getSystemDocs,
  downloadDoc,
};

export default DocumentService;
