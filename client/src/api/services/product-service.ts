import Product from "../models/Product";
import { axiosInstance } from "@/lib/axios";
import mapProducts from "../mappers/products-mapper";
const api = import.meta.env.VITE_API_URL;

export function getAllProducts() {
  return axiosInstance
    .get(`${api}/products`)
    .then((response) => {
      const mappedResponse = mapProducts(response.data);
      console.log("mapped: ", mappedResponse.products);
      return mappedResponse.products;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      throw error;
    });
}

export function getUserProducts(userId: string) {
  return axiosInstance
    .get(`${api}/${userId}/products`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching user products:", error);
      throw error;
    });
}

export function deleteProduct(productId: string) {
  return axiosInstance
    .delete(`${api}/products/${productId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
      throw error;
    });
}

export function buyProduct({
  userID,
  product,
}: {
  userID: string;
  product: Product;
}) {
  return axiosInstance
    .post(`${api}/${userID}/addProduct`, product)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error buying product:", error);
      throw error;
    });
}

export function addProduct(newProduct: Product) {
  return axiosInstance
    .post(`${api}/products`, newProduct)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding product:", error);
      throw error;
    });
}
export function editProduct(productId: string, updatedProduct: Product) {
  return axiosInstance
    .put(`${api}/updateProduct/${productId}`, updatedProduct)
    .then((response) => {
      console.log("Product edited successfully:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error editing product:", error);
      throw error;
    });
}

export function getSearchedProducts({ search }: { search: string }) {
  return axiosInstance
    .get("/products", {
      params: {
        search,
      },
    })
    .then((data) => mapProducts(data.data));
}