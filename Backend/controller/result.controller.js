import Result from "../model/result.model.js";

export const saveResult = async (req, res) => {
    try {
        const { name, subject, score, totalMarks,userId } = req.body;

        if (!name || !subject || score === undefined || !totalMarks) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const percentage = ((score / totalMarks) * 100).toFixed(2);

        const newResult = new Result({ name, subject, score, totalMarks, percentage, userId });

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