import UserDocument from "../models/User";
import { Request, Response } from "express";
import { Error } from "mongoose";

const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await UserDocument.create({ username, email, password });
    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error: unknown) {
    if (error instanceof Error.ValidationError) {
      res.status(400).json({ message: error.message });
    }
  }
};

const signIn = async (req: Request, res: Response) => {};

export { signUp, signIn };
