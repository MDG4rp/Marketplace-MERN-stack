const express = require("express");
const router = express.Router();
const {
  register,
  login,
  adminAuth,
  updateRole,
  deleteUser,
} = require("../controllers/auth.controller");

router.post("/register", register);
router.route("/login").post(login);
router.route("/updateUserRole").put(adminAuth, updateRole);
router.route("/deleteUser").delete(adminAuth, deleteUser);
router.get("/admin", adminAuth, (req, res) => res.json({ message: "Admin Route" }));

module.exports = router;
