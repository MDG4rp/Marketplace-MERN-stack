import { axiosInstance } from "@/lib/axios";

const api = import.meta.env.VITE_API_URL;

export const getAllUsers = () => {
  return axiosInstance.get(`${api}/users`);
};

export const deleteUser = (userId: string) => {
  return axiosInstance.delete(`${api}/users/${userId}`);
};
