import { api, requestConfig } from "../utils/config";

//get user detalis
const profile = async (data: any, token: string) => {
  const config = requestConfig("GET", data, token);

  try {
    const res = await fetch(api + "/users/profile", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//change password user
const password = async (data: any, token: string): Promise<any> => {
  const config = requestConfig("PUT", data, token);
  try {
    const res = await fetch(api + "/users/password", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//update user details
const update = async (data: any, token: string): Promise<any> => {
  const config = requestConfig("PUT", data, token);
  try {
    const res = await fetch(api + "/users/update", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const ProfileService = {
  update,
  profile,
  password,
};

export default ProfileService;
