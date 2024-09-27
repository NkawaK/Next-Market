import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qcl1j.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Success: Connected to MongoDB.");
  } catch {
    console.error("Failure: Unconnected to MongoDB.");
    throw new Error();
  }
};

export { connectDB };
