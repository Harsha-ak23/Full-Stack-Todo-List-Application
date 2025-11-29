import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    stack: { type: String },
    path: { type: String },
    method: { type: String },
  },
  { timestamps: true }
);

const Log =  mongoose.model("Log", logSchema);
export default Log;