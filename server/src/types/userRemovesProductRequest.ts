import { Request } from "express";

export interface UserRemovesProductRequest extends Request {
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
