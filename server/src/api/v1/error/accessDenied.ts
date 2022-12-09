import CustomError from "./customError";
import status from "http-status-codes";

class AccessDenied extends CustomError {
  constructor(message: string) {
    super(message, status.FORBIDDEN);
  }
}

export default AccessDenied;
