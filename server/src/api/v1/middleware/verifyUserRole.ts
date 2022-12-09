import { throws } from "assert";
import { NextFunction, Request, Response } from "express";
import { AccessDenied } from "../error/index";

const VerifyUserRole =
  (...allowedRole: Array<String>) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req?.role) throw new AccessDenied("Access Denied");

    if (allowedRole.includes(req.role)) {
      next();
    } else {
      throw new AccessDenied("Access Denied");
    }
  };

export default VerifyUserRole;
