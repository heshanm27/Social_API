import { Request, Response } from "express";
import userModel from "../../models/api/user.model";
import { BadRequestError } from "../../error/index";
import bcrypt from "bcrypt";

//update user
const UpdateUser = async (req: Request, res: Response) => {
  if (!req.userID) throw new BadRequestError("No user found");

  if (!req.body) return new BadRequestError("No data provided");

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;
  }

  const updateUser = await userModel
    .findByIdAndUpdate({
      _id: req.userID,
      ...req.body,
    })
    .exec();

  res.status(200).json({ msg: "User updated successfully", data: updateUser });
};

//delete user
const DeleteUser = async (req: Request, res: Response) => {
  if (!req.userID) throw new BadRequestError("No user found");

  const deleteUser = await userModel.findByIdAndDelete(req.userID).exec();

  res.status(200).json({ msg: "User deleted successfully", data: deleteUser });
};

//get a user
const GetUser = async (req: Request, res: Response) => {
  if (!req.userID) throw new BadRequestError("No user found");

  const user = await userModel
    .findById(req.userID, { password: 0, createdAt: 0, updatedAt: 0 })
    .exec();

  res.status(200).json({ msg: "User fetched successfully", data: user });
};

//follow a user

const FollowUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) return new BadRequestError("You must provide a userId");

  if (req.body.userId === id)
    return new BadRequestError("You can't follow yourself");

  if (req.userID === id)
    return new BadRequestError("You can't follow yourself");

  const follower = await userModel.findById(id).exec();

  const curruntUser = await userModel.findById(req.userID).exec();

  if (!follower || !curruntUser)
    throw new BadRequestError("user doesn't exist");

  if (curruntUser.profile.followings?.includes(follower._id))
    res.status(403).json("you allready follow this user");
  try {
    await curruntUser.updateOne({
      $push: { "profile.followings": follower._id },
    });
    await follower.updateOne({
      $push: { "profile.followers": curruntUser._id },
    });

    res.status(200).json("user has been followed");
  } catch (err: any) {
    return new BadRequestError(err);
  }
};
