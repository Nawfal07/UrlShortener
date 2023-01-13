import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.info("Connected successfuly");
  } catch (error) {
    console.error("Connection to database could not be established", error);
  }
};

export default connectDB;
