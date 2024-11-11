//authService.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import argon2 from "argon2";
import { Op } from "sequelize";

export const registerUser = async (username, email, password) => {
  // Check if email or username is already in use
  const existingUser = await User.findOne({
    where: { [Op.or]: [{ email }, { username }] },
  });
  if (existingUser) {
    const errorMsg = existingUser.email === email
      ? "Email is already in use"
      : "Username is already in use";
    throw new Error(errorMsg);
  }
  
  // Hash the password before saving
  const hashedPassword = await argon2.hash(password);
  try {
    // Create a new user
    return await User.create({ username, email, password: hashedPassword });
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

export const loginUser = async (identifier, password) => {
  const user = await User.findOne({
    where: { [Op.or]: [{ username: identifier }, { email: identifier }] },
  });
  // identify if the user or password is wrong
  if (!user || !(await argon2.verify(user.password, password))) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, user };
};
