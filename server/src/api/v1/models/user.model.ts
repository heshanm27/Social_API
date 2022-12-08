import { Schema, Model, Types, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  email: string;
  password: string;
  fullName: string;
  age: number;
  gender: GenderEnum;
  profilePicture: string;
  coverPicture: string;
  followers: Types.Array<Types.ObjectId>;
  followings: Types.Array<Types.ObjectId>;
  userRole: UserRoleEnum;
  bio: string;
  city: string;
  from: string;
  relationship: number;
  otherSoialMedia: Types.Array<string>;
}

export interface UserDocument extends Document, IUser {
  generateAuthToken(): string;
  isValidPassword(recievedPassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
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
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      max: 100,
      min: 3,
    },
    age: {
      type: Number,
      min: 5,
    },
    gender: {
      type: String,
      enum: Object.values(GenderEnum),
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
      type: [Types.ObjectId],
      default: [],
    },
    followings: {
      type: [Types.ObjectId],
      default: [],
    },
    userRole: {
      type: String,
      enum: Object.values(UserRoleEnum),
      default: UserRoleEnum.user,
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
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user model
UserSchema.pre<IUser>("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare the entered password to the hashed password in the database
UserSchema.methods.isValidPassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const isValid = await bcrypt.compare(candidatePassword, this.password);
  return isValid;
};

//Create a JWT token for the user
UserSchema.methods.generateAuthToken = function (): string {
  return jwt.sign(
    { id: this._id, userRole: this.userRole },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
};
export default model<UserDocument>("User", UserSchema);
