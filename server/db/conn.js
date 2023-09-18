import mongoose from "mongoose";

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  throw new Error("Invalid Environment variable");
}

export const connectToMongoDB = async () => {
  console.log("Attempting to connect to MongoDB Atlas...");

  try {
    await mongoose.connect(ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "tastyBook",
    });
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("MongoDB connection error", err);
  }
};
