import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../types/user";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";


export default function isAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).json({ message: "Forbidden" });
    }

    if (typeof decoded === "object" && decoded !== null) {
      const decodedUser = decoded as User;
      req.user = {
        id: decodedUser.id,
        username: decodedUser.username,
        role: decodedUser.role,
      };
      next();
    } else {
      res.status(403).json({ message: "Invalid token" });
    }
  });
}