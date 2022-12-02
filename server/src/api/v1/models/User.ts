import { Schema, Model, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

enum GenderEnum {
  male = "male",
  female = "female",
  other = "other",
}
enum UserRoleEnum {
  user = "user",
  admin = "admin",
  moderator = "moderator",
}

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  userFullName: string;
  age: number;
  gender: GenderEnum;
  profilePicture: string;
  coverPicture: string;
  followers: Types.Array<string>;
  followings: Types.Array<string>;
  userRole: UserRoleEnum;
  bio: string;
  city: string;
  from: string;
  relationship: number;
  otherSoialMedia: Types.Array<string>;
}
export interface UserDocument extends Document, IUser {}

const UserSchema = new Schema<IUser>(
  {
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
    userFullName: {
      type: String,
      required: [true, "Full name is required"],
      unique: true,
      max: 100,
      min: 3,
    },
    age: {
      type: Number,
      min: 5,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
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
    userRole: {
      type: String,
      enum: ["admin", "user", "moderator"],
      default: "user",
    },
    bio: {
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
    otherSoialMedia: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.genSalt(this.password, salt);
  next();
});

export default mongoose.model<UserDocument>("User", UserSchema);
