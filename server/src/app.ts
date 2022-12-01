import express, { Application } from "express";
import logger from "./api/utility/logger";
import dbConnetion from "../src/api/config/dbConfig";
import dotenv from "dotenv";

const app: Application = express();
dotenv.config();

dbConnetion(process.env.MONGO_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
    app.listen(5000, (): void => {
      logger.info("Server running on port 5000");
    });
  })
  .catch((error) => {
    logger.error(error.message);
  });
