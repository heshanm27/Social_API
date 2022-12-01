import express, { Application } from "express";
import logger from "./api/utility/logger";

const app: Application = express();

app.listen(5000, (): void => {
  console.log("Server running on port 5000");
  logger.info("Server running on port 5000");
  logger.error("Server connetion error");
  logger.debug("Server connetion debug");
  logger.warn("Server connetion warn");
});
