import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import conversationRouter from "./routes/conversation.routes.js";
import { app, server } from "./socket/socket.js";

import { connectToDb } from "./db/connectToDb.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://icychat.onrender.com", "http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);
app.use("/api/conversation", conversationRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  const statusText = err.status === 500 ? "Internal Server Error" : err.message;
  res.status(err.status).json({
    status: err.status,
    message: statusText,
  });
  next();
});

server.listen(PORT, () => {
  connectToDb();
  console.log(`Server is running on port ${PORT}`);
});
