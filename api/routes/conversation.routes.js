import express from "express";
import { getConversationsByUserId } from "../controllers/conversation.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";
const router = express.Router();

router.get("/", verifyUser, getConversationsByUserId);

export default router;
