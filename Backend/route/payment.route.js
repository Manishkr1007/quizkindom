import express from "express";
import { confirmPayment, getPayments, updatePaymentStatus } from "../controller/payment.controller.js";

const router = express.Router();

router.post("/confirm", confirmPayment);
router.get("/list", getPayments);
router.patch("/:id/status", updatePaymentStatus);

export default router;
