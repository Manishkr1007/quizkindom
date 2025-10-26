import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


import TestRoute from "./route/test.route.js";
import userRoute from "./route/user.route.js";
import resultRoute from "./route/result.route.js";
import questionRoute from "./route/question.route.js";
import unlockedTestRoute from "./route/unlockedTest.route.js";
import bookRoute from "./route/book.route.js";
import paymentRoute from "./route/payment.route.js";

// Load environment variables before using them
dotenv.config();

const app = express();

// Allow JSON request bodies
app.use(express.json());

// CORS configuration (supports multiple origins, proper preflight)
const FRONTEND_URLS = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow non-browser tools (no Origin header)
    if (!origin) return callback(null, true);
    if (FRONTEND_URLS.length === 0) return callback(null, true); // dev fallback
    if (FRONTEND_URLS.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
// Explicitly handle preflight requests
app.options("*", cors(corsOptions));
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
const URI = process.env.MongoDBURI;


try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}
mongoose.connection.once('open', async () => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log("📦 Collections in DB:", collections.map(c => c.name));
});

console.log("🚀 Server config:", { PORT, FRONTEND_URLS });

// defining routes
app.use("/api/v1/test", TestRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/result", resultRoute);
app.use("/api/v1/question", questionRoute);
app.use("/api/v1/unlocked-tests",unlockedTestRoute); 
app.use("/api/v1/book", bookRoute);
app.use("/api/v1/payment", paymentRoute);





app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});