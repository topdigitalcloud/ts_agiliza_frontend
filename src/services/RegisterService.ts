import { api, requestConfig } from "../utils/config";

const register = async (data: any): Promise<any> => {
  const config = requestConfig("POST", data);
  try {
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const RegisterService = {
  register,
};

export default RegisterService;
