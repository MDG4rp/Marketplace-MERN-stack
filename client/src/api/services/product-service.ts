import Product from "../models/Product";
import { axiosInstance } from "@/lib/axios";
import mapProducts from "../mappers/products-mapper";
const api = import.meta.env.VITE_API_URL;

interface PaginationParams {
  search?: string;
  page?: number;
  limit?: number;
}

export function getAllProducts({
  search,
  page = 1,
  limit = 5,
}: PaginationParams) {
  return axiosInstance
    .get(`${api}/products`, {
      params: {
        search,
        page,
        limit,
      },
    })
    .then((response) => {
      const mappedResponse = mapProducts(response.data);
      return {
        products: mappedResponse.products,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalProducts: response.data.totalProducts,
        message: response.data.message,
      };
    })
    .catch((error) => {
      throw error;
    });
}

export function getUserProducts({
  userId,
  search,
  page = 1,
  limit = 10,
}: {
  userId: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  return axiosInstance
    .get(`${api}/${userId}/products`, {
      params: { search, page, limit },
    })
    .then((response) => {
      const mappedResponse = mapProducts(response.data);
      return {
        products: mappedResponse.products,
        currentPage: response.data.page,
        totalPages: response.data.totalPages,
        totalProducts: response.data.totalProducts,
      };
    })
    .catch((error) => {
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
      throw error;
    });
}

export function editProduct(productId: string, updatedProduct: Product) {
  return axiosInstance
    .put(`${api}/updateProduct/${productId}`, updatedProduct)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getSearchedProducts({
  search,
  page = 1,
  limit = 10,
}: {
  search: string;
  page?: number;
  limit?: number;
}) {
  return axiosInstance
    .get("/products", {
      params: { search, page, limit },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function getSearchedUserProducts({
  userId,
  search,
  page = 1,
  limit = 10,
}: {
  userId: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const params = {
    search,
    page,
    limit,
  };

  return axiosInstance
    .get(`/${userId}/products`, { params })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching user products:', error);
      throw error;
    });
}
