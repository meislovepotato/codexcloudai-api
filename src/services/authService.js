//authService.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Service for user registration
export const registerUser = async (username, password, role) => {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
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
    if (!user) {
      throw new Error("User not found");
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET, // Store this in your .env file
      { expiresIn: "1h" }
    );

    return { token, user };
  } catch (error) {
    throw new Error(error.message);
  }
};
