import express from "express";
import { getQuestions } from "../controller/question.controller.js";

const router = express.Router();

router.get("/question", getQuestions);

export default router;