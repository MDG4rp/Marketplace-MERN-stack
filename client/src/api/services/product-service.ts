import Product from "../models/Product";
import { axiosInstance } from "@/lib/axios";

const api = import.meta.env.VITE_API_URL;

export function getAllProducts() {
  return axiosInstance.get(`${api}/products`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error("Error fetching all products:", error);
      throw error;
    });
}

export function getUserProducts(userId: string) {
  return axiosInstance.get(`${api}/${userId}/products`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error("Error fetching user products:", error);
      throw error;
    });
}

export function addProductToUser({ userId, name, price, quantity }: { userId: string; name: string; price: number; quantity: number; }) {
  return axiosInstance.post(`${api}/users/${userId}/products/addProduct`, { name, price, quantity })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error("Error adding product to user:", error);
      throw error;
    });
}

export function deleteProduct(productId: string) {
  return axiosInstance.delete(`${api}/products/${productId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error("Error deleting product:", error);
      throw error;
    });
}

export function addProduct(newProduct: Product) {
  return axiosInstance.post(`${api}/products`, newProduct)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error("Error adding product:", error);
      throw error;
    });
}