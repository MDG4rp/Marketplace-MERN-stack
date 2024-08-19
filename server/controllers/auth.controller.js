const User = require("../models/user.model");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.RTS;
const jwt = require("jsonwebtoken");

// Register and after login
const register = async (req, res, next) => {
  const { name, username, password } = req.body;
  try {
    // Controlla se l'utente esiste già
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Crea un nuovo utente
    const user = await User.create({ name, username, password });

    // Genera i token
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

    // Invia la risposta con i token e le informazioni dell'utente
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
  const user = await User.findOne({ username }).catch((error) => {
    console.log(error);
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.password !== password) {
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

module.exports = {
  register,
  login,
  getAllUsers,
  deleteUser,
};
