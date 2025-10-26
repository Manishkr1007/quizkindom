import Payment from "../model/payment.model.js";

export const confirmPayment = async (req, res) => {
  try {
    const { userId, testId, imageUrl, userName, userEmail, price,testName } = req.body;
    if (!userId || !testId || !imageUrl || !userName || !userEmail || !price || !testName) {
      return res.status(400).json({ message: "All fields are required (including price)" });
    }

    const payment = new Payment({ userId, testId, imageUrl, userName, userEmail, price,testName });
    await payment.save();

    res.status(201).json({ message: "Payment request saved", payment });
  } catch (error) {
    console.error("Error saving payment request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// GET /api/v1/payment/list
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json({ payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH /api/v1/payment/:id/status
import mongoose from "mongoose";
import User from "../model/user.model.js";

export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!id || !status) {
      return res.status(400).json({ message: "id and status are required" });
    }
    const payment = await Payment.findByIdAndUpdate(id, { status }, { new: true });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // If approved, unlock test for user
    if (status === "approved") {
      await User.updateOne(
        { _id: payment.userId },
        { $addToSet: { unlockedTests: payment.testId } }
      );
    }

    res.status(200).json({ message: "Payment status updated", payment });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
