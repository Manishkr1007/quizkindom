import Result from "../model/result.model.js";

export const saveResult = async (req, res) => {
    try {
        const { name, subject, score, totalMarks, userId } = req.body;

        if (!name || !subject || score === undefined || totalMarks === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const numScore = Number(score);
        const numTotal = Number(totalMarks);
        if (!Number.isFinite(numScore) || !Number.isFinite(numTotal) || numTotal <= 0) {
            return res.status(400).json({ message: "Invalid score or totalMarks" });
        }

        const percentage = ((numScore / numTotal) * 100).toFixed(2);

        const newResult = new Result({ name, subject, score: numScore, totalMarks: numTotal, percentage, userId });

        await newResult.save();

        res.status(201).json({ message: "Result saved successfully", result: newResult });
    } catch (error) {
        console.error("Error saving result:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getResults = async (req, res) => {
    try {
        const results = await Result.find();
        res.status(200).json({ results });
    } catch (error) {
        console.error("Error fetching results:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// GET /api/v1/result/totalScore?userId=123[&subject=physics]
export const getTotalScore = async (req, res) => {
    try {
        const { userId, subject } = req.query;
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const match = { userId };
        if (subject) match.subject = subject;

        const agg = await Result.aggregate([
            { $match: match },
            {
                $group: {
                    _id: null,
                    totalScore: { $sum: "$score" },
                    totalMarks: { $sum: "$totalMarks" },
                    attempts: { $sum: 1 }
                }
            }
        ]);

        if (!agg.length) {
            return res.status(200).json({ totalScore: 0, totalMarks: 0, attempts: 0, percentage: "0.00" });
        }

        const { totalScore, totalMarks, attempts } = agg[0];
        const percentage = totalMarks > 0 ? ((totalScore / totalMarks) * 100).toFixed(2) : "0.00";

        res.status(200).json({ totalScore, totalMarks, attempts, percentage });
    } catch (error) {
        console.error("Error computing total score:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
