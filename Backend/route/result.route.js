import express from "express";
import { saveResult, getTotalScore } from "../controller/result.controller.js";

const router = express.Router();

router.post("/saveResult", saveResult);
router.get("/totalScore", getTotalScore);

export default router;