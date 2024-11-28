import joi from "joi";

export const userSchema = joi
  .object({
    fullName: joi.string().required().min(3).max(30),
    username: joi.string().required().min(3).max(30),
    email: joi.string().email().required(),
    gender: joi.valid("male", "female").required(),
    password: joi.string().min(6).max(10).required(),
    confirmPassword: joi.ref("password"),
  })
  .with("password", "confirmPassword")
  .required();
