import jwt from "jsonwebtoken";
import User  from "../model/user.model.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1]; // Extract token
    }

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT secret is missing");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
