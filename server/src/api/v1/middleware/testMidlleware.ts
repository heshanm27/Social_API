import { Router, Request, Response, NextFunction } from "express";

const testMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    console.log("testMiddleware");
    throw new Error("testMiddleware Error");
    next();
  };

export default testMiddleware;
