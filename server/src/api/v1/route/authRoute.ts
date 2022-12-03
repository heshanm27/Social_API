import express from "express";
import { signUp, signIn } from "../controllers/authControllers";
const router = express.Router();

router.route("/signin").post(signIn);
router.route("/signup").post(signUp);

export default router;
