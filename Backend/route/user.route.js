import express from "express";
import { signup, login, getUserProfile, upsertUser, getUserById } from "../controller/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.post("/signup", signup);


router.get("/:id", getUserById);

export default router;