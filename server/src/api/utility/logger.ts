import winston, { transports, format } from "winston";

const customeLoggerFormat = format.combine(
  format.timestamp(),
  format.printf(({ timestamp, level, message }) => {
    return `${timestamp} :- ${level.toUpperCase().padEnd(7)}: ${message}`;
  })
);

const logger = winston.createLogger({
  format: customeLoggerFormat,
  level: "debug",
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/info.log", level: "info" }),
    new transports.File({ filename: "logs/debug.log", level: "debug" }),
  ],
});

export default logger;
