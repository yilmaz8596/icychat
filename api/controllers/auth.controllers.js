import User from "../models/user.model.js";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
export const signup = async (req, res, next) => {
  try {
    const { fullName, username, email, password, confirmPassword, gender } =
      req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(createHttpError.Conflict("User already exists"));
    }
    if (password !== confirmPassword) {
      return next(createHttpError.BadRequest("Passwords do not match"));
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const user = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (user) {
      generateToken(user._id, res);
      await user.save();
      res.status(201).json({
        status: "success",
        message: "User created successfully",
        user: {
          _id: user._id,
          fullName,
          username,
          email,
          gender,
        },
      });
    }
  } catch (error) {
    console.log(error);
    next(createHttpError.InternalServerError());
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return next(createHttpError.NotFound("User not found"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists?.password
    );

    if (!isPasswordCorrect) {
      return next(createHttpError.Unauthorized("Invalid credentials"));
    }

    generateToken(userExists._id, res);

    res.status(200).json({
      status: "success",
      message: "User signed in successfully",
      user: {
        _id: userExists._id,
        fullName: userExists.fullName,
        username: userExists.username,
        email: userExists.email,
      },
    });
  } catch (error) {}
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      status: "success",
      message: "User signed out successfully",
    });
  } catch (error) {
    next(createHttpError.InternalServerError());
  }
};
