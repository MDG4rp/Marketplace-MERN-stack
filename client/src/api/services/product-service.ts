import { axiosInstance } from "@/lib/axios";
const api = import.meta.env.VITE_API_URL;

export async function getAllProducts() {
  try {
    const response = await axiosInstance.get(`${api}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
}

export async function getUserProducts(userId: string) {
  try {
    const response = await axiosInstance.get(`${api}/users/${userId}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user products:", error);
    throw error;
  }
}

export async function addProductToUser({
  userId,
  name,
  price,
  quantity,
}: {
  userId: string;
  name: string;
  price: number;
  quantity: number;
}) {
  try {
    const response = await axiosInstance.post(
      `${api}/users/${userId}/products/addProduct`,
      { name, price, quantity }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product to user:", error);
    throw error;
  }
}
