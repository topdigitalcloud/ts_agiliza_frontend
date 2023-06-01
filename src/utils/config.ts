export const api: string = process.env.REACT_APP_URL_BASE_API + "/api";
export const uploads: string = process.env.REACT_APP_URL_BASE_API + "/uploads";

export const requestConfig = (
  method: string,
  data: any,
  token: string | null = null,
  image: any | null = null
) => {
  let config = {};

  if (image) {
    config = {
      method: method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method: method,
      headers: {},
    };
  } else {
    config = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (token) {
    config = { ...config, headers: { Authorization: `Bearer ${token}` } };
  }

  return config;
};
