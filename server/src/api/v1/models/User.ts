import mongoose from "mongoose";
import userInfoSchema from "./UserInfo";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      max: 50,
      min: 3,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: 6,
    },
    userInfo: userInfoSchema,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
