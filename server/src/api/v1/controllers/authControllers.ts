import UserDocument from "../models/User";
import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { BadRequestError } from "../error/errorClasses";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  try {
    const user = await UserDocument.create({ username, email, password });
    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error: any) {
    // if (error instanceof Error.ValidationError) {
    //   next(new BadRequestError(error.message));
    //   //   res.json({ error: error.message });
    // }
  }
};

const signIn = async (req: Request, res: Response) => {};

export { signUp, signIn };
