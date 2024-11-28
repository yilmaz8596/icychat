import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";
import Messages from "../models/message.model.js";
import createHttpError from "http-errors";
export const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "An error occurred while fetching user"));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }
    const { username, password, profilePic, email } = req.body;

    if (!username || !password || !email) {
      return next(createHttpError(400, "All fields are required"));
    }
    const userUpdated = await User.findByIdAndUpdate(
      userId,
      {
        username,
        password,
        profilePic,
        email,
      },
      { new: true }
    );

    res.status(200).json({
      message: "User updated successfully",
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "An error occurred while updating user"));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }
    await User.findByIdAndDelete(userId);
    await Conversation.updateMany(
      {
        participants: userId,
      },
      {
        $pull: {
          participants: userId,
        },
      }
    );
    await Messages.deleteMany({
      $or: [{ senderId: userId }, { receiverId: userId }],
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "An error occurred while deleting user"));
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    if (!users) {
      return next(createHttpError(404, "No users found"));
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "An error occurred while fetching users"));
  }
};
