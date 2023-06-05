import { api, requestConfig } from "../utils/config";

const logout = () => {
  localStorage.removeItem("user");
};

const login = async (data: any): Promise<any> => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const LoginService = {
  logout,
  login,
};

export default LoginService;
