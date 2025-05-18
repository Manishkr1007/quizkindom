import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  topic: String,
  question: String,
  options: {
    a: String,
    b: String,
    c: String,
    d: String
  },
  answer: String
});

// Force the model to use the 'questions' collection
const questionModel = mongoose.model("Question", QuestionSchema, "questions");

export default questionModel;
