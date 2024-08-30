import { Request } from "express";

export interface UserAddsProductRequest extends Request {
  params: {
    id: string;
  };
  body: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  };
}
