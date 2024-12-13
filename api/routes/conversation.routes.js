import express from "express";
import {
  getConversationsByUserId,
  createConversation,
} from "../controllers/conversation.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";
const router = express.Router();

router.post("/", verifyUser, createConversation);
router.get("/", verifyUser, getConversationsByUserId);

export default router;
