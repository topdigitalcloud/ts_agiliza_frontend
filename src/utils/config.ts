export const api: string = String(process.env.REACT_APP_URL_BASE_API);
export const urlapp: string = String(process.env.REACT_APP_URL_BASE);

export const requestConfig = (method: string, data: any, token: string | null = null, image: any | null = null) => {
  let config: any = {};

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
    config = {
      ...config,
      headers: { ...config.headers, Authorization: `Bearer ${token}` },
    };
  }

  return config;
};
