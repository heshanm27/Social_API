import { Schema, Model, Types, model, ObjectId } from "mongoose";

export interface IPost {
  id: ObjectId;
  userId: string;
  desc: string;
  img: string[];
  likes: string[];
}

export interface PostDocument extends Document, IPost {}

const PostSchema: Schema<IPost> = new Schema<IPost>(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default model<PostDocument>("post", PostSchema);
