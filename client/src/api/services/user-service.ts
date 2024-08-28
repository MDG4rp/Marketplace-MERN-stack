import { axiosInstance } from "@/lib/axios";
import mapGetAllUsersRequest from "../mappers/total-users-mapper";
import mapGetUserRequest from "../mappers/user-mapper";
const api = import.meta.env.VITE_API_URL;

export function getAllUsers() {
  return axiosInstance
    .get(`${api}/userslist`)
    .then((response) => {
      const mappedResponse = mapGetAllUsersRequest(response.data);
      return mappedResponse.users;
    })
    .catch((error) => {
      throw error;
    });
}
export function deleteUser(userId: string) {
  return axiosInstance.delete(`${api}/deleteUser/${userId}`);
}

export function updateRole(userId: string, role: string) {
  return axiosInstance.put(`${api}/updateUserRole/${userId}`, { role });
}

export function getUser(userId: string) {
  return axiosInstance
    .get(`${api}/getUser/${userId}`)
    .then((response) => {
      const mappedResponse = mapGetUserRequest(response.data);
      return mappedResponse.user;
    })
    .catch((error) => {
      throw error;
    });
}
