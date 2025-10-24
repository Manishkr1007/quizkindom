import express from "express";
import { getQuestions, addQuestions } from "../controller/question.controller.js";

const router = express.Router();

router.get("/question", getQuestions);
router.post("/add", addQuestions);

export default router;