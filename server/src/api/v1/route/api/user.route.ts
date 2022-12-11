import express from "express";
import VerifyUserRole from "../../middleware/common/verifyUserRole";
import VerifyJWT from "../../middleware/common/verifyJWT";

const router = express.Router();

router.use(VerifyJWT);
router.use(VerifyUserRole("user", "admin"));

router.route("/").get().post();
router.route("/:id").get().patch().delete();
