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
