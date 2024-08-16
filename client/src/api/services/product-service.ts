import { axiosInstance } from "@/lib/axios";


export async function getAllProducts() {
  const api = import.meta.env.VITE_API_URL;
  try {
    const response = await axiosInstance.get(`${api}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
}


export async function getUserProducts(userId:string) {
  const api = import.meta.env.VITE_API_URL;
  try {
    const response = await axiosInstance.get(`${api}/users/${userId}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user products:", error);
    throw error;
  }
}