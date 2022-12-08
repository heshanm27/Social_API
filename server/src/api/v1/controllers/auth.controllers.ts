import UserDocument from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { BadRequestError } from "../error/index";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, fullName } = req.body;
  try {
    const user = await UserDocument.create({
      email,
      password,
      fullName,
    });
    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
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

  const user = await UserDocument.findOne({ email });

  if (!user) {
    throw new BadRequestError("Account does not exist for this email");
  }

  const isValid = await user.isValidPassword(password);

  if (!isValid) {
    throw new BadRequestError("Email or password is incorrect");
  }
  const token = user.generateAuthToken();

  res.status(200).json({ token });
};

export { signUp, signIn };
