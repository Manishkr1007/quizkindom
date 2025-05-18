// model/unlockedTest.model.js
import mongoose from "mongoose";

const unlockedTestSchema = mongoose.Schema({
  email: { type: String, required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
});

const UnlockedTest = mongoose.model("UnlockedTest", unlockedTestSchema);
export default UnlockedTest;
