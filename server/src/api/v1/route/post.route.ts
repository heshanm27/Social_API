import express from "express";
import { getPostDetails } from "../controllers/post.controller";
import VerifyUserRole from "../middleware/verifyUserRole";
const router = express.Router();

router.route("/").get(VerifyUserRole("admin"), getPostDetails).post();
router.route("/:id").get().patch().put().delete();

export default router;
