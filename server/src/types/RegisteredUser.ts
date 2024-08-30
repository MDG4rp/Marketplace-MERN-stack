export interface RegisteredUser {
  _id: string;
  name: string;
  username: string;
  password: string;
  role: string;
  products: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}