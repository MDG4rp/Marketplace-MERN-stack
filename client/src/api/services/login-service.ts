import { axiosInstance } from "@/lib/axios";
import LoginInfo from "../models/LoginInfo";

const api = import.meta.env.VITE_API_URL;
export function login(user: LoginInfo) {
  return axiosInstance
    .post(`${api}/login`, user, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
