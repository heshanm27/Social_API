import { NextFunction, Request, Response } from "express";

const RefreshToken =
  () => (req: Request, res: Response, next: NextFunction) => {
    console.log("redreshToken", req.headers.authorization);

    next();
  };

export default RefreshToken;
