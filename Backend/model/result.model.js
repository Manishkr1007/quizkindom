import mongoose from "mongoose";

const ResultSchema = mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    score: { type: String, required: true },
    totalMarks: { type: String, required: true },
    percentage: { type: String, required: false },
});

const Result = mongoose.model("Result", ResultSchema);

export default Result;
