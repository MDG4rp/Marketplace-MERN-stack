import { axiosInstance } from "@/lib/axios";

const api = import.meta.env.VITE_API_URL;

export const getAllUsers = () => {
  return axiosInstance.get(`${api}/userslist`);
};

export const deleteUser = (userId: string) => {
  return axiosInstance.delete(`${api}/deleteUser/${userId}`);
};
