import express from "express";
import { getPostDetails } from "../controllers/post.controller";

const router = express.Router();

router.route("/").get(getPostDetails).post();
router.route("/:id").get().patch().put().delete();

export default router;
