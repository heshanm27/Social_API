import mongoose, { ConnectOptions } from "mongoose";
import logger from "../utility/logger";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const dbConnetion = async (uri: string) => {
  try {
    await mongoose.connect(uri, options as ConnectOptions);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error(error);
  }
};

export default dbConnetion;
