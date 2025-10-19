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


// Utility to use collection names exactly as provided (no lowercasing, no replacement)
const sanitizeCollectionName = (name) =>
  name?.toString().trim();

// Dynamic getter: returns a Mongoose model bound to the provided collection
// Uses a unique model name per collection to avoid OverwriteModelError
export const getQuestionModel = (collectionName = "questions") => {
  const sanitized = sanitizeCollectionName(collectionName) || "questions";

  // For the default collection, reuse the classic model name if available
  if (sanitized === "questions") {
    return (
      mongoose.models.Question ||
      mongoose.model("Question", QuestionSchema, "questions")
    );
  }

  const modelName = `Question_${sanitized}`;
  return (
    mongoose.models[modelName] ||
    mongoose.model(modelName, QuestionSchema, sanitized)
  );
};

// Backward-compatible default export for the 'questions' collection
const questionModel =
  mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema, "questions");

export default questionModel;
