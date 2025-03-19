import express from "express";
import { signup, login,getUserProfile } from "../controller/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.post("/signup", signup);
router.post("/login", login);

export default router;