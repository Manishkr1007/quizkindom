import mongoose from "mongoose";

const ResultSchema = mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: false },
    subject: { type: String, required: true },
    score: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    percentage: { type: String, required: false },
    totalScore: { type: Number, required: false, default: 0 },
    submittedAt: { type: Date, default: Date.now },
});

const Result = mongoose.model("Result", ResultSchema);

export default Result;
