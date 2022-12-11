import express from "express";
import { getPostDetails } from "../../controllers/api/post.controller";
import VerifyUserRole from "../../middleware/common/verifyUserRole";
const router = express.Router();

router.route("/").get(getPostDetails).post();
router.route("/:id").get().patch().put().delete();

export default router;
