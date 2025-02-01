import express from "express";
import {saveResult} from "../controller/result.controller.js";

const router = express.Router();

router.post("/saveResult", saveResult);

export default router;