"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./utility/logger"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = __importDefault(require("./route/authRoute"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/v1/auth/", authRoute_1.default);
(0, dbConfig_1.default)(process.env.MONGO_URI)
    .then(() => {
    logger_1.default.info("Connected to MongoDB");
    app.listen(5000, () => {
        logger_1.default.info("Server running on port 5000");
    });
})
    .catch((error) => {
    logger_1.default.error(error.message);
});
//# sourceMappingURL=app.js.map