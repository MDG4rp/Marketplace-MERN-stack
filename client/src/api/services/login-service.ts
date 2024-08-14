import axios from "axios";
import LoginInfo from "../models/LoginInfo";

export default function login(user: LoginInfo) {
  const api = import.meta.env.VITE_API_URL;

  return axios.post(`${api}/login`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    console.log(response.data);
    return response.data;
  })
  .catch((error) => {
    console.error("Error while logging: ", error);
    throw error;
  });
}