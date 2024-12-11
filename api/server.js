import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import conversationRouter from "./routes/conversation.routes.js";

import { connectToDb } from "./db/connectToDb.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);
app.use("/api/conversation", conversationRouter);

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  const statusText = err.status === 500 ? "Internal Server Error" : err.message;
  res.status(err.status).json({
    status: err.status,
    message: statusText,
  });
  next();
});

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server is running on port ${PORT}`);
});
