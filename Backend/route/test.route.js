import express from "express";
import { getTest, addTest } from "../controller/test.controller.js";

const router = express.Router();

router.get("/", getTest);
router.post("/add", addTest);

export default router;