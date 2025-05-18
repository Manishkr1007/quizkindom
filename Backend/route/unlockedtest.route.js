// routes/unlockedTest.route.js
import express from "express";
import { getUnlockedTestsByEmail } from "../controller/unlockedtest.controller.js";

const router = express.Router();

router.get("/", getUnlockedTestsByEmail); // GET /api/unlocked-tests?email=...

export default router;
