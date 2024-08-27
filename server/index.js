import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";

dotenv.config();
const app = express();

connectDb(process.env.MONGO_URI);

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
