import { api, requestConfig } from "../utils/config";

//set Label for System
const setDocToSystem = async (data: any, token: string) => {
  const config = requestConfig("POST", data, token);
  try {
    const res = await fetch(api + "/systems/document/link", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//set Label for System
const removeDocFromSystem = async (data: any, token: string) => {
  const config = requestConfig("POST", data, token);
  try {
    const res = await fetch(api + "/systems/document/unlink", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const LinkSystemDocService = {
  setDocToSystem,
  removeDocFromSystem,
};

export default LinkSystemDocService;
