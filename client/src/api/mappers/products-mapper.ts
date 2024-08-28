import Product from "../models/Product";
import getAllProductsResponse from "../models/GetAllProductsResponse";

export function mapProduct(product: any) {
  return {
    id: product._id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: product.quantity,
    updatedAt: product.updatedAt,
    createdAt: product.createdAt,
  } as Product;
}

export default function mapProducts(products: any) {
  return {
    currentPage: products.currentPage,
    totalPages: products.totalPages,
    totalProducts: products.totalProducts,
    message: products.message,
    products: products.products.map((product: any) => mapProduct(product)),
  } as getAllProductsResponse;
}
