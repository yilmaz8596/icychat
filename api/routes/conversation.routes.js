import express from "express";
import {
  getConversationsByUserId,
  createConversation,
} from "../controllers/conversation.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";
const router = express.Router();

router.get("/", verifyUser, getConversationsByUserId);
router.post("/", verifyUser, createConversation);

export default router;
