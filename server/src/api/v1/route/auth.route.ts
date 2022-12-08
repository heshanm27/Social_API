import express from "express";
import { signUp, signIn } from "../controllers/auth.controllers";
import testMiddleware from "../middleware/testMidlleware";
import redisClient from "../config/redis.config";
const router = express.Router();

router.route("/signin").post(testMiddleware(), signIn);
router.route("/signup").post(signUp);
router.route("/test").get(async (req, res) => {
  redisClient.set("test", "test");
  const value = await redisClient.get("local");
  res.status(200).json({ value });
});

export default router;
