"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utility/logger"));
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const dbConnetion = async (uri) => {
    try {
        return mongoose_1.default.connect(uri, options);
    }
    catch (error) {
        logger_1.default.error(error);
    }
};
exports.default = dbConnetion;
//# sourceMappingURL=dbConfig.js.map