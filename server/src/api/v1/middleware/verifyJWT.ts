import { NextFunction, Request, Response } from "express";
import { Unauthenticated } from "../error/index";
import JWT from "jsonwebtoken";
import RefreshToken from "./refreshToken";

const VerifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  //   //no token found throw error
  if (!authHeader) throw new Unauthenticated("Access Denied");

  //   //separate token from bearer
  const token = authHeader.toString().split(" ")[1];

  //verify access token
  JWT.verify(
    token,
    process.env.JWT_ACCESS_SECRET!,
    (err: any, decoded: any) => {
      console.log("decoded", decoded);
      if (err && err.message === "jwt expired") {
        RefreshToken()(req, res, next);
      }
      if (err && err.message === "invalid token") {
        console.log("invalid token");
        throw new Unauthenticated(err.message);
      }
      req.userID = decoded.id;
      req.role = decoded.userRole;
    }
  );

  next();
};

export default VerifyJWT;
