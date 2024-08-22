import { axiosInstance } from "@/lib/axios";
import  mapGetAllUsersRequest  from "../mappers/users-mapper";

const api = import.meta.env.VITE_API_URL;

export function getAllUsers(){
  return axiosInstance
    .get(`${api}/userslist`)
    .then((response) => {
      const mappedResponse = mapGetAllUsersRequest(response.data);
      console.log("mapped: ", mappedResponse.users);
      return mappedResponse.users;
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      throw error;
    });
}
export const deleteUser = (userId: string) => {
  return axiosInstance.delete(`${api}/deleteUser/${userId}`);
};

export const updateRole = (userId: string, role: string) => {
  return axiosInstance.put(`${api}/updateUserRole/${userId}`, { role });
};