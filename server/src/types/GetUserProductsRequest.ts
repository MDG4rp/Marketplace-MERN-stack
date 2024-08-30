import { Request } from "express";
export interface GetUserProductsRequest extends Request {
  params: {
    userId: string;
  };
  query: {
    search?: string;
    page?: string;
    limit?: string;
  };
}
