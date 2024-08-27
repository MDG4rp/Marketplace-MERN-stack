const express = require("express");
const router = express.Router();
const {
  getProducts,
  getUserProducts,
  addProduct,
  userAddsProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/products.controller");
const isAdmin = require("../middlewares/admin.middleware");
const isAuth = require("../middlewares/auth.middleware");

// Get all products
router.get("/products", isAuth, getProducts);

// Get all products for a specific user
router.get("/:id/products", isAuth, getUserProducts);

// Admin creates a new product
router.post("/products", isAdmin, addProduct);

// User adds a product to their own list
router.post("/:id/addProduct", isAuth, userAddsProduct);

// Admin updates a product
router.put("/updateProduct/:id", isAdmin, updateProduct);

// Admin deletes a specific product from the market
router.delete("/products/:id", isAdmin, deleteProduct);

module.exports = router;
