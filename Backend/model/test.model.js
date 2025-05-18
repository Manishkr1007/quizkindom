import mongoose from "mongoose";

const testSchema = mongoose.Schema({
    name: String,
    price: Number,
    testname: String,
    category: String,
    image: String,
    title: String,
});
const Test = mongoose.model("Test", testSchema);

export default Test;