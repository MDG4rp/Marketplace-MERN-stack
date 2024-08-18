const User = require("../models/user.model");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refreshtoken.model");

// Register
const register = async (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = await User.create({ username, password });
    const accessToken = jwt.sign(
      { id: user._id, username, role: user.role },
      jwtSecret
    );
    res.status(201).json({
      message: "User successfully created",
      user: user._id,
      token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// Login
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).catch(
    (error) => {
      console.log(error);
    }
  );

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const jwtToken = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    jwtSecret
  );

  res.status(200).json({
    message: "User successfully logged in",
    jwt: jwtToken,
    refreshToken: jwtSecret,
    id: user._id,
    name: user.username,
    role: user.role
  });
};

// Logout
const logout = async (req, res, next) => {
  const { refreshToken } = req.body;

  try {
    if (refreshToken) {
      await RefreshToken.deleteOne({ token: refreshToken });
    }
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
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
  getAllUsers,
  deleteUser,
  logout,
};
