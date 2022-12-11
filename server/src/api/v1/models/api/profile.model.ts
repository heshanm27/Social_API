import { Schema, Types, model } from "mongoose";

export interface IProfile {
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

export interface ProfileDocument extends Document, IProfile {}

const ProfileSchema: Schema<IProfile> = new Schema<IProfile>(
  {
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

export default model<ProfileDocument>("Profile", ProfileSchema);
