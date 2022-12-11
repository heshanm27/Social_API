import { Schema, Model, Types, model, ObjectId } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ProfileModel, { IProfile } from "./profile.model";

enum GenderEnum {
  male = "male",
  female = "female",
  other = "other",
}

interface IUser {
  id: ObjectId;
  email: string;
  password: string;
  isAdmin: boolean;
  refreshToken: string[];
  firstName: string;
  lastName: string;
  birthDay: string;
  gender: GenderEnum;
  profile: IProfile;
}

export interface UserDocument extends Document, IUser {
  generateAccessToken(): string;
  genarateRefreshToken(): string;
  isValidPassword(recievedPassword: string): Promise<boolean>;
}

const ApiUserSchema: Schema<IUser> = new Schema<IUser>(
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    firstName: {
      type: String,
      max: 100,
      min: 3,
    },
    lastName: {
      type: String,
      max: 100,
      min: 3,
    },
    birthDay: {
      type: String,
      min: 5,
    },
    gender: {
      type: String,
      enum: Object.values(GenderEnum),
    },
    profile: ProfileModel,
  },
  { timestamps: true }
);

// Compare the entered password to the hashed password in the database
ApiUserSchema.methods.isValidPassword = async function (
  candidatePassword: string
): Promise<boolean> {
  console.log("isValidPassword", candidatePassword, this.password);
  const isValid = await bcrypt.compare(candidatePassword, this.password);
  return isValid;
};

//Create a access token for the user
ApiUserSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    { id: this._id, userRole: this.userRole },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "10s" }
  );
};

export default model<UserDocument>("User", ApiUserSchema);
