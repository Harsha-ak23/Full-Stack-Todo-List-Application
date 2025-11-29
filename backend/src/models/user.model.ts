import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://imgs.search.brave.com/OtnizHCGx2n01UJ-sS-RbYcY2rtSTNAEhOydMS7vHOU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzUv/NzEyLzAwOC9zbWFs/bC8zZC1zaW1wbGUt/dXNlci1pY29uLXBu/Zy5wbmc",
    },
    todo: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Todo",
      },
    ]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
