import CustomError from "./customError";
import status from "http-status-codes";

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, status.NOT_FOUND);
  }
}

export default NotFoundError;
