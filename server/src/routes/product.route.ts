import { Router } from "express";
import isAdmin from "../middlewares/admin.middleware";
import isAuth from "../middlewares/isAuth.middleware";
import {
  addProduct,
  adminDeletesProduct,
  getAllProducts,
  updateProduct,
  userAddsProduct,
  userRemovesProduct,
  getUserProducts,
} from "../controllers/products.controller";

const router = Router();

// Get all products
router.get("/products", getAllProducts);

// Get all products of a user
router.get("/:id/products", isAuth, getUserProducts);

// Admin creates a new product
router.post("/products", isAdmin, addProduct);

// Admin updates a product
router.put("/updateProduct/:id", isAdmin, updateProduct);

// Admin deletes a product from the market
router.delete("/products/:id", isAdmin, adminDeletesProduct);

// User deletes a product from their inventory
router.delete("/:id/removeProduct", isAuth, userRemovesProduct);

// User adds a product to their inventory
router.post("/:id/addProduct", isAuth, userAddsProduct);

export default router;
