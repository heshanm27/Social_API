import CustomError from "./customError";
import status from "http-status-codes";

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, status.BAD_REQUEST);
  }
}

export default BadRequestError;
