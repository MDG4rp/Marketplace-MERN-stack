const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAllUsers,
  deleteUser,
  updateUserRole,
} = require("../controllers/auth.controller");

// Route for user registration
router.post("/register", register);

// Route for user login
router.post("/login", login);

// Route to get all users
router.get("/userslist", getAllUsers);

// Route to delete a user
router.delete("/deleteUser/:id", deleteUser); 

// Route to update user role to admin or user
router.put("/updateUserRole/:id", updateUserRole);

module.exports = router;