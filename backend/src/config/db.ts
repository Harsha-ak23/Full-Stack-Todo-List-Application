import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
        throw new Error("MONGO_URL is not defined in environment variables");
      }

    const mongo = await mongoose.connect(mongoUrl);
    console.log("DB successfully connected : ", mongo.connection.host);
  } catch (error:any) {
    console.log("Database connection failed : ", error.message);
    process.exit(1);
  }
};

export default connectDB;
