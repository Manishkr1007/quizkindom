export const getTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await Test.findById(id);
        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
import Test from "../model/test.model.js";

export const getTest = async(req, res) => {
    try {
        const test = await Test.find();
        res.status(200).json(test);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};


export const addTest = async (req, res) => {
    try {
        const { testname, title, price, category, image ,name} = req.body;
        if (!testname || !title || !price || !category || !image || !name) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTest = new Test({ testname, title, price, category, image, name });
        await newTest.save();

        res.status(201).json({ message: "Test added", test: newTest });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Testname already exists" });
        }
        console.error("Error adding test:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};