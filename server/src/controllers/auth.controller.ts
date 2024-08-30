import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { RegisterRequest } from "../types/RegisterRequest";
import { UserDocument } from "../types/UserDocument";
import { LoginRequest } from "../types/LoginRequest";
import { UpdateUserRoleRequest } from "../types/UpdateUserRoleRequest";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

config();

const refreshTokenSecret = process.env.RTS as string;
const jwtSecret = process.env.JWT_SECRET as string;

export async function register(
  req: RegisterRequest,
  res: Response
): Promise<void> {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
      role: "user",
      products: [],
    });

    await newUser.save();

    const accessToken = jwt.sign(
      { username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign({ username }, process.env.RTS as string, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User successfully created",
      jwt: accessToken,
      refreshToken: refreshToken,
      id: newUser._id,
      username: newUser.username,
      role: newUser.role,
      name: newUser.name,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
export async function login(req: LoginRequest, res: Response): Promise<void> {
  const { username, password } = req.body;

  try {
    const user: UserDocument | null = await User.findOne({ username });

    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const accessToken = jwt.sign(
      { id: user._id, username, role: user.role },
      jwtSecret,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, username },
      refreshTokenSecret,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "User successfully logged in",
      jwt: accessToken,
      refreshToken,
      id: user._id,
      username: user.username,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users: UserDocument[] = await User.find();

    res.status(200).json({ message: "Users retrieved", users: users });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function deleteUser(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;

  try {
    const user: UserDocument | null = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    next(error);
  }
}

export async function updateUserRole(
  req: UpdateUserRoleRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user: UserDocument | null = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User role successfully updated",
      user: {
        id: user._id,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getUser(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;
  const userIdFromToken = req.user?.id;

  if (userIdFromToken !== id) {
    res
      .status(403)
      .json({ message: `Forbidden: You can only view your own profile, id: ${userIdFromToken}` });
    return;
  }

  try {
    const user: UserDocument | null = await User.findById(id).select(
      "-password"
    );
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return
    }
    res.status(200).json({ message: "User retrieved", user: user });
    next();
  } catch (error) {
    next(error);
  }
}
