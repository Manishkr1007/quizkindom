import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: { type: String, required: true },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    unlockedTests: [{ type: String }]
});
const User = mongoose.model("User", userSchema);
export default User;