import express from "express";
import { getTest, addTest, getTestById, deleteTest } from "../controller/test.controller.js";

const router = express.Router();

router.get("/", getTest);
router.post("/add", addTest);
router.get("/:id", getTestById);
router.delete("/:id", deleteTest);

export default router;