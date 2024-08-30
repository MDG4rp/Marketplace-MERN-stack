import { Request } from "express";

export interface RegisterRequest extends Request {
  body: {
    name: string;
    username: string;
    password: string;
  };
}
