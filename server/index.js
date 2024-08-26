import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";

dotenv.config();
const app = express();

connectDb(process.env.MONGO_URI);

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
