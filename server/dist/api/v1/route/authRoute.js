"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const router = express_1.default.Router();
router.route("/signin").post(authControllers_1.signIn);
router.route("/signup").post(authControllers_1.signUp);
exports.default = router;
//# sourceMappingURL=authRoute.js.map