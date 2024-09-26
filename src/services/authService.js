//authService.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import argon2 from "argon2";

// Service for user registration
export const registerUser = async (username, email, password, role) => {
  try {
    // Hash the password before saving
    const hashedPassword = await argon2.hash(password);

    console.log("Hashed Password:", hashedPassword);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service for user login
export const loginUser = async (username, password) => {
  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // Check if user exists
    if (!user) {
      throw new Error("User not found");
    }

    // Directly compare the passwords
    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token, user };
  } catch (error) {
    throw new Error(error.message);
  }
};
