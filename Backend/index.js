import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


import TestRoute from "./route/test.route.js";
import userRoute from "./route/user.route.js";
// Other middleware and route definitions

// Serve Vercel toolbar and other non-essential paths with a fallback
app.get('/?vercelToolbarCode=:code', (req, res) => {
    res.status(204).end();  // 204 No Content, safe to ignore Vercel-specific requests
  });
  
  // Handle undefined routes (Fallback)
  app.use((req, res) => {
    res.status(404).json({ message: "Resource not found" });
  });
  

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();
app.use(express.static('public'));

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// defining routes
app.use("/Test", TestRoute);
app.use("/user", userRoute);



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});