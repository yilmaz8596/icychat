import Conversation from "../models/conversation.model.js";
import createHttpError from "http-errors";

export const getConversationsByUserId = async (req, res, next) => {
  try {
    const loggedInUserId = req.user._id;

    const conversations = await Conversation.find({
      participants: { $in: [loggedInUserId] },
    })
      .populate("participants", "-password -__v")
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 }, limit: 1 },
      });

    // Format conversations to include otherParticipant
    const formattedConversations = conversations.map((conversation) => {
      const otherParticipant = conversation.participants.find(
        (participant) =>
          participant._id.toString() !== loggedInUserId.toString()
      );

      return {
        ...conversation.toObject(),
        otherParticipant,
      };
    });

    res.status(200).json(formattedConversations);
  } catch (error) {
    console.log(error);
    next(createHttpError.InternalServerError());
  }
};

export const createConversation = async (req, res, next) => {
  try {
    const { otherUserId } = req.body;
    const loggedInUserId = req.user._id;

    // Check for existing conversation with populated messages
    const existingConversation = await Conversation.findOne({
      participants: { $all: [loggedInUserId, otherUserId] },
    }).populate("messages"); // Add this populate call

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    // Create new conversation
    const newConversation = new Conversation({
      participants: [loggedInUserId, otherUserId],
    });

    await newConversation.save();

    // Fetch the saved conversation with populated messages
    const populatedConversation = await Conversation.findById(
      newConversation._id
    ).populate("messages");

    res.status(201).json(populatedConversation);
  } catch (error) {
    console.log(error);
    next(createHttpError.InternalServerError());
  }
};
