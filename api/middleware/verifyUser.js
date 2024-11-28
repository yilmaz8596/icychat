import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import createHttpError from "http-errors";

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);

    if (!token) return next(createHttpError.Unauthorized());
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id).select("-password");
    if (!user) return next(createHttpError.Unauthorized());
    req.user = user;
    console.log(user);

    next();
  } catch (error) {
    return next(createHttpError.Unauthorized());
  }
};
