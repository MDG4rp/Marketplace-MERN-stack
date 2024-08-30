import { config } from "dotenv";
config(); // Carica subito le variabili d'ambiente

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../types/user";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

const jwtSecret = process.env.JWT_SECRET;

export default function isAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, jwtSecret || "", (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const decodedUser = decoded as User;
    if (decodedUser && decodedUser.role !== "admin") {
      return res.status(403).json({ message: "Access forbidden: Admins only" });
    }

    req.user = decodedUser;
    next();
  });
}