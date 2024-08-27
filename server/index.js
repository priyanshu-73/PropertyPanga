import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();
const app = express();

connectDb(process.env.MONGO_URI);

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
