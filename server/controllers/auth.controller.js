const User = require("../models/user.model");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.RTS;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { id: user._id, name: name, username: username, role: user.role },
      jwtSecret,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, name: name, username: username, role: user.role },
      refreshTokenSecret,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "User successfully created",
      jwt: accessToken,
      refreshToken: refreshToken,
      id: user._id,
      username: user.username,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    next(error);
  }
};

// Login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const jwtToken = jwt.sign(
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
      jwt: jwtToken,
      refreshToken: refreshToken,
      id: user._id,
      username: user.username,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({ message: "Users retrieved", users: users });
  } catch (error) {
    next(error);
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    next(error);
  }
};

// update user role to admin or user

const updateUserRole = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User role updated successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  register,
  login,
  getAllUsers,
  deleteUser,
  updateUserRole,
};
