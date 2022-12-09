import { Schema, Model, Types, model } from "mongoose";

enum GenderEnum {
  male = "male",
  female = "female",
  other = "other",
}

export interface IUserProfile {
  fullName: string;
  age: number;
  gender: GenderEnum;
  profilePicture?: string;
  coverPicture?: string;
  followers?: Types.Array<Types.ObjectId>;
  followings?: Types.Array<Types.ObjectId>;
  bio?: string;
  city?: string;
  from?: string;
  relationship?: number;
  otherSoialMedia?: Types.Array<string>;
  userRef: Types.ObjectId;
}

export interface UserProfileDocument extends Document, IUserProfile {}

const UserProfileSchema: Schema<IUserProfile> = new Schema<IUserProfile>(
  {
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
    userRef: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model<UserProfileDocument>("UserProfile", UserProfileSchema);
