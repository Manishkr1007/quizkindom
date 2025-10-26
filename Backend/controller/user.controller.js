// GET /api/v1/user/:id
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
// POST /api/v1/user/upsert
export const upsertUser = async (req, res) => {
    try {
        console.log("[upsertUser] API hit. Body:", req.body);
        const { id, email, fullname } = req.body;
        if (!id || !email || !fullname) {
            return res.status(400).json({ message: "id, email, and fullname are required" });
        }
        await User.updateOne(
            { _id: id },
            { $set: { email, fullname } },
            { upsert: true }
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper function to generate JWT
const generateToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving
        const hashPassword = await bcryptjs.hash(password, 10);

        // Create a new user
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
        });

        // Save the user to the database
        await createdUser.save();

        // Generate a JWT token for the new user
        const token = generateToken(createdUser._id);
        console.log(token);

        // Return the success response with the token
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
            },
            token,  // Send the token in the response
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate a JWT token for the logged-in user
        const token = generateToken(user._id);
        console.log(token);

        // Return the success response with the user details and token
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
            token,  // Send the token in the response
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        // Ensure that the user ID exists in the request object
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Fetch the user from the database (excluding password for security)
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }   
};
