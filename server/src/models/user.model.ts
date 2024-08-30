import mongoose, { Schema, Document } from "mongoose";

interface IProduct {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface IUser extends Document {
  username: string;
  name: string;
  password: string;
  role: string;
  products: IProduct[];
}

const productSchema = new Schema({
  name: String,
  quantity: Number,
  price: Number,
  image: String,
});

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
    products: [productSchema],
  },
  {
    timestamps: true,
    collection: "user-data",
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;