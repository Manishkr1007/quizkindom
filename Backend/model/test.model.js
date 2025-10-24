import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    testname: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true }
}, { collection: "tests" });

const Test = mongoose.model("Test", testSchema);
export default Test;