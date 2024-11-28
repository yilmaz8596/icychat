import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: "Name is required",
    unique: true,
  },
  email: {
    type: String,
    required: "Email is required",
    unique: true,
  },
  password: {
    type: String,
    required: "Password is required",
    minLength: 6,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  profilePic: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
