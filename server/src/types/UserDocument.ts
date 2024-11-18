import { Document } from "mongoose";
import { ProductDocument } from "./ProductDocument";

export interface UserDocument extends Document {
  name: string;
  username: string;
  password: string;
  role: string;
  products: ProductDocument[];
}
