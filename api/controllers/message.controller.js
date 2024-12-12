import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import createHttpError from "http-errors";

export const getMessages = async (req, res, next) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const messages = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!messages) {
      return res.status(200).json({
        status: "success",
        data: {
          messages: [],
        },
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        messages,
      },
    });
  } catch (error) {
    console.log(error);
    next(createHttpError.InternalServerError());
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation?.messages?.push(newMessage);
    }

    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json({
      _id: newMessage._id,
      senderId: newMessage.senderId,
      receiverId: newMessage.receiverId,
      message: newMessage.message,
    });
  } catch (error) {
    console.log(error);
    next(createHttpError.InternalServerError());
  }
};
