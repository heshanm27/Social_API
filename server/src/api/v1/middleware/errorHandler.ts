import { Request, Response, NextFunction } from "express";
import CustomError from "../error/customError";
import status from "http-status-codes";
import Logger from "../utility/logger";

const ErrorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(status.INTERNAL_SERVER_ERROR).json({
    error: err.message,
    msg: "Something went wrong, please try again later",
  });
};

export default ErrorHandlerMiddleware;
