import mongoose from "mongoose";

const connectDb = async (mongo_uri) => {
  await mongoose
    .connect(mongo_uri)
    .then(() => console.log("Connected to Database"));
};

export default connectDb;
