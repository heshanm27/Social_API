import { Request, Response } from "express";

const getPostDetails = (req: Request, res: Response) => {
  console.log("getPostDetails");
  res.send("getPostDetails");
};

export { getPostDetails };
