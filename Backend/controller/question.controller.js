import questionModel, { getQuestionModel } from "../model/question.model.js";

export const getQuestions = async (req, res) => {
  try {
    const { topic, subject, limit } = req.query;

 
    const collectionKey = (subject || topic || "questions").toString();
    const Questions = getQuestionModel(collectionKey);

    let filter = {};
    if (topic && subject) {
      filter.topic = { $regex: `^${topic}$`, $options: "i" };
    }

    const parsedLimit = Number(limit);
    const applyLimit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 0;

    const questions = await Questions
      .find(filter)
      .limit(applyLimit);

    console.log(`Fetched questions from '${collectionKey}' collection:`, questions?.length ?? 0);
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// POST /api/v1/question/add?subject=Physics
// Body: { ...question } or [ { ...question }, ... ]
export const addQuestions = async (req, res) => {
  try {
    const subject = req.query.subject || req.body.subject;
    if (!subject) {
      return res.status(400).json({ message: "Subject is required as query or in body" });
    }

    const Questions = getQuestionModel(subject);
    let questions = req.body;

    // If body is { subject, questions: [...] }
    if (questions && questions.questions && Array.isArray(questions.questions)) {
      questions = questions.questions;
    }

    // Accept single object or array
    if (!Array.isArray(questions)) {
      questions = [questions];
    }

    // Validate basic fields
    for (const q of questions) {
      if (!q.topic || !q.question || !q.options || !q.answer) {
        return res.status(400).json({ message: "Each question must have topic, question, options, answer" });
      }
    }

    // Insert many
    const result = await Questions.insertMany(questions);
    res.status(201).json({ message: "Questions added", count: result.length, questions: result });
  } catch (error) {
    console.error("Error adding questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

