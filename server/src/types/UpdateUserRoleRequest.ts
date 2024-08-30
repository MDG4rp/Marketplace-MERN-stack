import { Request } from "express";

export interface UpdateUserRoleRequest extends Request {
  params: {
    id: string;
  };
  body: {
    role: string;
  };
}
