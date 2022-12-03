"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = require("mongoose");
const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User_1.default.create({ username, email, password });
        const token = user.generateAuthToken();
        res.status(201).json({ user, token });
    }
    catch (error) {
        if (error instanceof mongoose_1.Error.ValidationError) {
            res.status(400).json({ message: error.message });
        }
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => { };
exports.signIn = signIn;
//# sourceMappingURL=authControllers.js.map