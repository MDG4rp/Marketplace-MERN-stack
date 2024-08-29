const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/admin.middleware");
const isAuth = require("../middlewares/auth.middleware");
const {
  register,
  login,
  getAllUsers,
  deleteUser,
  updateUserRole,
  getUser,
} = require("../controllers/auth.controller");

// Route for user registration
router.post("/register", register);

// Route for user login
router.post("/login", login);

// Route to get all users
router.get("/userslist", isAdmin, getAllUsers);

// Route to get a user by ID
router.get("/getUser/:id", isAuth, getUser);

// Route to delete a user
router.delete("/deleteUser/:id", isAdmin, deleteUser);

// Route to update user role to admin or user
router.put("/updateUserRole/:id", isAdmin, updateUserRole);

module.exports = router;
