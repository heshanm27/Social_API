import mongoose, { ConnectOptions } from "mongoose";
import Logger from "../utility/logger";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const dbConnetion = async (uri: string | undefined) => {
  try {
    return mongoose.connect(uri!, options as ConnectOptions);
  } catch (error) {
    Logger.error(error);
  }
};

export default dbConnetion;
