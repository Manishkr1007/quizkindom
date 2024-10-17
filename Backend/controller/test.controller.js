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