import { Request, Response } from "express";

const getPostDetails = (req: Request, res: Response) => {
  console.log("getPostDetails");
  console.log("reqId", req!.userID);
  res.send("getPostDetails");
};

//TODO:create a post

//TODO:update  a post

//TODO:delete a post

//TODO:like a post

//TODO:get a a post

//TODO:get all posts
export { getPostDetails };
