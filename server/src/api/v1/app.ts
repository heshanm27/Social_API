import express, { Application, Request, Response, NextFunction } from "express";
import "express-async-errors";
import Logger from "./utility/logger";
import dbConnetion from "./config/db.config";
import dotenv from "dotenv";
import authRoute from "./route/auth.route";
import postRoute from "./route/post.route";
import RequestLogMiddleware from "./middleware/requestLog";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import redisClient from "./config/redis.config";
import VerifyJWT from "./middleware/verifyJWT";
const app: Application = express();
dotenv.config();

//**Parse incoming Request Object as a JSON Object  */
app.use(express.json());
//**Accept html form data(Url encoded data)  */
app.use(express.urlencoded({ extended: true }));

const CorsOptions: cors.CorsOptions = {
  origin: "*",
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true,
};

//**Enable CORS */
app.use(cors(CorsOptions));

//**Connect to MongoDB **/
dbConnetion(process.env.MONGO_URI)
  .then(async () => {
    Logger.info("Connected to MongoDB");
    // await redisClient.connect();
    StartServer();
  })
  .catch((error) => {
    Logger.error("Unable to connect" + error.message);
  });

//** Only start the server if Mongo Connects**/

const StartServer = function () {
  app.use(RequestLogMiddleware);

  //**Routes */
  /** Deafult route */
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ msg: "Welcome to the API" });
  });

  /** Auth Routes */
  app.use("/api/v1/auth/", authRoute);

  /**Verify JWT Validation */
  app.use(VerifyJWT);

  app.use("/api/v1/post", postRoute);
  // //**Custom Error Handler Middleware */
  app.use(errorHandler);

  app.listen(process.env.PORT || 5000, (): void => {
    Logger.info("Server running on port 5000");
  });
};
