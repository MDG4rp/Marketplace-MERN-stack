import { axiosInstance } from "@/lib/axios";
import LoginInfo from "../models/LoginInfo";

export default async function login(user: LoginInfo) {
  const api = import.meta.env.VITE_API_URL;

  try {
    const response = await axiosInstance.post(`${api}/login`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    
    if (response.data) {
      console.log(response.data);
      localStorage.setItem("jwt", response.data.jwt);
      return response.data;
    } else {
      throw new Error("Invalid login response");
    }
  } catch (error) {
    console.error("Error while logging in: ", error);
    throw error;
  }
}