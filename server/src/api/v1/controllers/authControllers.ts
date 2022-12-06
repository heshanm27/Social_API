import UserDocument from "../models/User";
import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { BadRequestError } from "../error";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, fullName } = req.body;
  try {
    const user = await UserDocument.create({
      username,
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
    throw new Error(error.message);
  }
};

const signIn = async (req: Request, res: Response) => {};

export { signUp, signIn };
