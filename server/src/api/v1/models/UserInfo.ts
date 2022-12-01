import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    max: 100,
  },
  lastName: {
    type: String,
    max: 100,
  },
  age: {
    type: Number,
    min: 18,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverPicture: {
    type: String,
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  desc: {
    type: String,
    max: 100,
  },
  city: {
    type: String,
    max: 50,
  },
  from: {
    type: String,
    max: 50,
  },
  relationship: {
    type: Number,
    enum: [1, 2, 3],
  },
});

export default mongoose.model("UserInfo", userInfoSchema);
