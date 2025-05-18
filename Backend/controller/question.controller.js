import questionModel from "../model/question.model.js";

export const getQuestions = async (req, res) => {
  try {
    const { topic, limit } = req.query;

    let filter = {};
    if (topic) {
      filter.topic = { $regex: `^${topic}$`, $options: "i" }; 
    }

    const questions = await questionModel
      .find(filter)
      .limit(Number(limit) || 0);

    console.log("Fetched questions:", questions);
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

