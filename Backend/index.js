import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


import TestRoute from "./route/test.route.js";
import userRoute from "./route/user.route.js";
import resultRoute from "./route/result.route.js";
import questionRoute from "./route/question.route.js";
import unlockedTestRoute from "./route/unlockedTest.route.js";



  

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();
app.use(express.static('public'));

const PORT = process.env.PORT || 4000;
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

// defining routes
app.use("/api/v1/test", TestRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/result", resultRoute);
app.use("/api/v1/question", questionRoute);
app.use("/api/v1/unlocked-tests",unlockedTestRoute); 





app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});