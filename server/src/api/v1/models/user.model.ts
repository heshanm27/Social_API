import { Schema, Model, Types, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

enum UserRoleEnum {
  user = "user",
  admin = "admin",
  moderator = "moderator",
}

export interface IUser {
  email: string;
  password: string;
  userRole: UserRoleEnum;
  refreshToken: [string];
}

export interface UserDocument extends Document, IUser {
  generateAccessToken(): string;
  genarateRefreshToken(): string;
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
    userRole: {
      type: String,
      enum: Object.values(UserRoleEnum),
      default: UserRoleEnum.user,
    },
    refreshToken: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// // Hash the password before saving the user model
// UserSchema.pre<IUser>("", async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// Compare the entered password to the hashed password in the database
UserSchema.methods.isValidPassword = async function (
  candidatePassword: string
): Promise<boolean> {
  console.log("isValidPassword", candidatePassword, this.password);
  const isValid = await bcrypt.compare(candidatePassword, this.password);
  return isValid;
};

//Create a access token for the user
UserSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    { id: this._id, userRole: this.userRole },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "15m" }
  );
};

//Create a refresh token for the user
UserSchema.methods.genarateRefreshToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "1d",
  });
};
export default model<UserDocument>("User", UserSchema);
