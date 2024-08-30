import { Router } from "express";
import {
  register,
  login,
  updateUserRole,
  deleteUser,
  getUser,
  getAllUsers,
} from "../controllers/auth.controller";
import isAuth from "../middlewares/isAuth.middleware";
import isAdmin from "../middlewares/admin.middleware";

const router = Router();

// Route per registrare un utente
router.post("/register", register);

// Route per il login
router.post("/login", login);

// Route per aggiornare il ruolo dell'utente (solo per admin)
router.put("/updateUserRole/:id", isAdmin, updateUserRole);

// Route per eliminare un utente (solo per admin)
router.delete("/deleteUser/:id", isAdmin, deleteUser);

// Route per ottenere le proprie informazioni di profilo
router.get("/getUser/:id", isAuth, getUser);

// Route per ottenere tutti gli utenti (solo per admin)
router.get("/userslist", isAdmin, getAllUsers);

export default router;
