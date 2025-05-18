// controller/unlockedTest.controller.js
import UnlockedTest from "../model/unlockedtest.model.js";
import Test from "../model/test.model.js";

export const getUnlockedTestsByEmail = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const unlocked = await UnlockedTest.find({ email }).populate("testId");
    const testNames = unlocked.map((entry) => entry.testId.name); // or .id

    res.status(200).json({ unlockedSubjects: testNames });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
