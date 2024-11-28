import express from "express";
import { signin, signup, signout } from "../controllers/auth.controllers.js";
import { userSchema } from "../schema/userSchema.js";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

router.post("/signup", validateUser(userSchema), signup);
router.post("/signin", signin);
router.post("/signout", signout);

export default router;
