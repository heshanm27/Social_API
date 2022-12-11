import UserDocument from "../../models/api/user.model";
import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { BadRequestError } from "../../error/index";
import bcrypt from "bcrypt";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    //salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create user and save in database
    const user = await UserDocument.create({
      email,
      password: hashPassword,
    });

    //generate token
    const token = user.generateAccessToken();

    res.status(200).json({ msg: "Account created successfully", token });
  } catch (error: any) {
    if (error instanceof Error.ValidationError) {
      throw new BadRequestError(error.message);
    }
    if (error.code === 11000) {
      throw new BadRequestError("Email already exists");
    }
    throw new Error(error.message);
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const foundUser = await UserDocument.findOne({ email }).exec();

  if (!foundUser) {
    throw new BadRequestError("Can't find account associate with this email");
  }

  const isValid = await foundUser.isValidPassword(password);

  if (!isValid) {
    throw new BadRequestError("Email or password is incorrect");
  }
  const token = foundUser.generateAccessToken();
  const refreshToken = foundUser.genarateRefreshToken();
  foundUser.refreshToken.push(refreshToken);
  await foundUser.save();

  res.cookie("JWTRefreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
  });
  res.status(200).json({ msg: "Successfuly sign in", token });
};

export { signUp, signIn };
