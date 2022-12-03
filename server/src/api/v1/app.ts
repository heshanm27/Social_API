import express, { Application, Request, Response, NextFunction } from "express";
import Logger from "./utility/logger";
import DbConnetion from "./config/dbConfig";
import dotenv from "dotenv";
import AuthRoute from "./route/authRoute";
import RequestLogMiddleware from "./middleware/requestLog";
import cors from "cors";

const app: Application = express();

const CorsOptions: cors.CorsOptions = {
  origin: "*",
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true,
};

dotenv.config();

//**Connect to MongoDB **/
DbConnetion(process.env.MONGO_URI)
  .then(() => {
    Logger.info("Connected to MongoDB");
    StartServer();
  })
  .catch((error) => {
    Logger.error("Unable to connect", error.message);
  });

//** Only start the server if Mongo Connects**/

const StartServer = function () {
  app.use(RequestLogMiddleware);

  //**Parse incoming Request Object as a JSON Object  */
  app.use(express.json());
  //**Accept html form data(Url encoded data)  */
  app.use(express.urlencoded({ extended: true }));

  //**Enable CORS */
  app.use(cors(CorsOptions));

  //**Routes */

  /** Deafult route */
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ msg: "Welcome to the API" });
  });

  app.use("/api/v1/auth/", AuthRoute);

  app.listen(process.env.PORT || 5000, (): void => {
    Logger.info("Server running on port 5000");
  });
};
