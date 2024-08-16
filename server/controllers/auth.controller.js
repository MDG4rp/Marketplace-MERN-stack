const User = require("../models/user.model");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

// Register user
const register = async (req, res, next) => {
  const { username, password } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const user = await User.create({
      username,
      password,
    });

    const maxAge = 3 * 60 * 60; // 3 hours
    const token = jwt.sign(
      { id: user._id, username, role: user.role },
      jwtSecret,
      { expiresIn: maxAge }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // 3 hours in ms
    });

    res.status(201).json({
      message: "User successfully created",
      user: user._id,
    });
  } catch (error) {
    next(error);
  }
};

// Login
const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && password  === user.password) {
      const maxAge = 3 * 60 * 60; // 3 hours
      const token = jwt.sign(
        { id: user._id, username, role: user.role },
        jwtSecret,
        { expiresIn: maxAge }
      );

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000, // 3 hours in ms
      });

      res.status(200).json({
        message: "User successfully logged in",
        user: user._id,
        username: user.username,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Login not successful" });
    }
  } catch (error) {
    next(error);
  }
};

// Admin authorization middleware
const adminAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token not available" });
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);

    if (decodedToken.role !== 'admin') {
      return res.status(401).json({ message: "Not authorized" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized", error: error.message });
  }
};

// Update user role
const updateRole = async (req, res, next) => {
  const { role, id } = req.body;

  if (!role || !id) {
    return res.status(400).json({ message: "Role and ID are required" });
  }

  if (role !== "admin") {
    return res.status(400).json({ message: "Only 'admin' role is allowed" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ message: "User is already an Admin" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: "Update successful", user });
  } catch (error) {
    next(error);
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  const { id } = req.body;

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

module.exports = {
  register,
  login,
  adminAuth,
  updateRole,
  deleteUser,
};