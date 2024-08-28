import RegisterInfo from "../models/RegisterInfo";
import { axiosInstance } from "@/lib/axios";
export default function register(user: RegisterInfo) {
  const api = import.meta.env.VITE_API_URL;

  return axiosInstance
    .post(`${api}/register`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
