import express from "express";
import { saveResult, getTotalScore ,getResultsByUser} from "../controller/result.controller.js";

const router = express.Router();

router.post("/saveResult", saveResult);
router.get("/totalScore", getTotalScore);
router.get("/user/:userId", getResultsByUser);

export default router;