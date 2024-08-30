import { Document } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  price: number;
  image?: string;
  quantity: number;
}
