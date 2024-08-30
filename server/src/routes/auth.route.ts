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

const router = Router();

// Route per registrare un utente
router.post("/register", register);

// Route per il login
router.post("/login", login);

// Route per aggiornare il ruolo dell'utente (solo per admin)
router.put("/updateUserRole/:id", updateUserRole);

// Route per eliminare un utente (solo per admin)
router.delete("/deleteUser/:id", deleteUser);

// Route per ottenere informazioni su un utente specifico
router.get("/getUser/:id",isAuth, getUser);

// Route per ottenere tutti gli utenti (solo per admin)
router.get("/userslist", getAllUsers);

export default router;
