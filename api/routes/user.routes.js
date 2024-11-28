import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  getUsers,
} from "../controllers/user.controller.js";

import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/", verifyUser, getUsers);
router.get("/:id", verifyUser, getUser);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);

export default router;
