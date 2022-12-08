import { createClient } from "redis";
import Logger from "../utility/logger";

const redisUrl = process.env.REDIS__HOST_URL;

const redisClient = createClient({ url: redisUrl });

redisClient.on("ready", () => {
  Logger.info("Redis connection established successfully");
});

redisClient.on("reconnecting", () => Logger.info("Redis reconnecting"));

redisClient.on("error", (error) => {
  Logger.error("Redis connection error: " + error.message);
});

export default redisClient;
