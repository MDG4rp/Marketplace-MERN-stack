import Product from "../models/Product";
import getAllProductsResponse from "../models/GetAllProductsResponse";

export function mapProduct(product: any) {
  return {
    id: product._id,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    updatedAt: product.updatedAt,
    createdAt: product.createdAt,
  } as Product;
}

export default function mapProducts(products: any) {
  return {
    message: products.message,
    products: products.products.map((product: any) => mapProduct(product)),
  } as getAllProductsResponse;
}
