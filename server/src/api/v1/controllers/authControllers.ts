import { UserDocument } from "../models/User";
import { Request, Response } from "express";

const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await UserDocument.create({ username, email, password });
  res.status(201).json({ user });
};

const signIn = async (req: Request, res: Response) => {};
