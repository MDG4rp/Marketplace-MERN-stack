import UserInfo from "../models/UserInfo";
import Product from "../models/Product";

export default function mapGetUserRequest(data: any) {
  return {
    message: data.message,
    user: mapUser(data.user),
  };
}

export function mapUser(data: any): UserInfo {
  return {
    userID: data._id,
    name: data.name,
    username: data.username,
    role: data.role,
    products: data.products.map((product: any) => mapProducts(product)),
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
    v: data.v,
  };
}

export function mapProducts(data: any): Product {
  return {
    id: data._id,
    name: data.name,
    price: data.price,
    quantity: data.quantity,
  };
}
