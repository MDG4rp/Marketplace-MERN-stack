import axios from "axios";
import RegisterInfo from "../models/RegisterInfo";

export default function register(user: RegisterInfo) {
  const api = import.meta.env.VITE_API_URL;

  return axios
    .post(`${api}/register`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("Registration successful");
        console.log("Response data:", response.data);
      } else {
        console.error("Registration failed with status:", response.status);
      }
      return response.data;
    })
    .catch((error) => {
      console.error("Error during registration:", error);

      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data);
      }

      throw error;
    });
}
