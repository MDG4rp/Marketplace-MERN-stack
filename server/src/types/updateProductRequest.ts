import { Request } from "express";

export interface UpdateProductRequest extends Request {
  params: {
    id: string;
  };
  body: {
    name: string;
    quantity: number;
  };
}
