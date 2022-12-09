import { NextFunction, Request, Response } from "express";
import { Unauthenticated } from "../error/index";
import JWT from "jsonwebtoken";

const VerifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("authHeader", authHeader);
  //   console.log("req.headers", req.headers.token);
  //no token found throw error
  if (!authHeader) throw new Unauthenticated("Access Denied");

  //separate token from bearer
  const token = authHeader.toString().split(" ")[1];
  console.log("token", token);
  //verify access token
  JWT.verify(
    token,
    process.env.JWT_ACCESS_SECRET!,
    (err: any, decoded: any) => {
      console.log("err", err);
      console.log("decoded", decoded);
      if (err) throw new Unauthenticated(err.message);
      req.userID = decoded.id;
      req.role = decoded.userRole;
    }
  );

  next();
};

export default VerifyJWT;
