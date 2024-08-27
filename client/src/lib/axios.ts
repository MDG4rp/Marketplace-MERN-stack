import axios from "axios";
import Cookies from "js-cookie";

const api = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const authToken = Cookies.get('_auth');
    const authType = Cookies.get('_auth_type');
    if (authToken && authType) {
      config.headers['Authorization'] = `${authType} ${authToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);