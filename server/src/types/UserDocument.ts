import { Document } from "mongoose";
import { product } from "./product";

export interface UserDocument extends Document {
  name: string;
  username: string;
  password: string;
  role: string;
  products: product[];
}
