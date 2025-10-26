import express from "express";
import { getTest, addTest, getTestById } from "../controller/test.controller.js";

const router = express.Router();

router.get("/", getTest);
router.post("/add", addTest);
router.get("/:id", getTestById);

export default router;