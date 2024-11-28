import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/:id", verifyUser, getMessages);
router.post("/send/:id", verifyUser, sendMessage);

export default router;
