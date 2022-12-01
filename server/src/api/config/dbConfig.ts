import mongoose, { ConnectOptions } from "mongoose";
import logger from "../utility/logger";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const dbConnetion = async (uri: string | undefined) => {
  try {
    return mongoose.connect(uri!, options as ConnectOptions);
  } catch (error) {
    logger.error(error);
  }
};

export default dbConnetion;
