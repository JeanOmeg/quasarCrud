import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
});

async function refreshToken(error) {
  return new Promise((resolve, reject) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const userToken = localStorage.getItem("userToken");
      const parameters = {
        method: "POST",
        headers: `Authorization: Bearer ${userToken}`,
      };
      const body = {
        grant_type: "refreshToken",
        refreshToken,
      };
      axios
        .post(process.env.API_URL + "refresh", body, parameters)
        .then(async (res) => {
          localStorage.setItem("userToken", res.data.token);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          // Fazer algo caso seja feito o refresh token
          return resolve(res);
        })
        .catch((err) => {
          // Fazer algo caso não seja feito o refresh token
          return reject(error);
        });
    } catch (err) {
      return reject(err);
    }
  });
}

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const token = localStorage.getItem("userToken");
    if (error.response.status === 401 && token) {
      const response = await refreshToken(error);
      return response;
    }
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});
export { api };
