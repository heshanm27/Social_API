import { Request, Response, NextFunction } from "express";
import { Unauthenticated } from "../../error/index";
import JWT from "jsonwebtoken";

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
      if (err) throw new Unauthenticated("Please login again");
      req.userID = decoded.id;
      next();
    }
  );
};

export default VerifyJWT;
