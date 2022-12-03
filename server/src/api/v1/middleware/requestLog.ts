import { Router, Request, Response, NextFunction } from "express";
import Logger from "../utility/logger";
const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  //** Log the request */
  Logger.info(
    `Incoming ->Method: [${req.method}] - Url: [${req.originalUrl}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    /**Log the Response */
    Logger.info(
      `Incoming ->Method: [${req.method}] - Url: [${req.originalUrl}] - IP: [${req.socket.remoteAddress}] -Status Code : [${res.statusCode}]`
    );
  });
  next();
});

export default router;
