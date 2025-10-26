import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  testId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  testName: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  price: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Payment", paymentSchema, "payments");
