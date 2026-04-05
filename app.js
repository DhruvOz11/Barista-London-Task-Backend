import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRouter from "./routes/task.js";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://your-netlify-app.netlify.app",
  }),
);

app.use("/task", taskRouter);
app.use("/user", userRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to db");
  } catch (error) {
    console.error("Error connecting to db", error);
  }
};

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  connectDB();
});
