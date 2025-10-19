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

