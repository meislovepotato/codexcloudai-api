//authController.js
import { Op } from "sequelize";
import User from "../models/user.js";
import { loginUser, registerUser } from "../services/authService.js";

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  console.log("Request Body:", req.body); // Log the request body

  // Check if the required fields are present
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  // Password validation: 8 char, 1 uppercase, 1 number, 1 special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.",
    });
  }

  try {
    // Check if the email or username already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      const errorMsg =
        existingUser.email === email
          ? "Email is already in use"
          : "Username is already in use";
      return res.status(400).json({ error: errorMsg });
    }

    // Call to register the user (assuming `registerUser` handles user creation)
    const newUser = await registerUser(username, email, password, role);

    // Respond with success if user creation is successful
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    // Log the error and respond with appropriate error message
    console.error(error);

    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res
        .status(400)
        .json({ error: error.errors.map((err) => err.message) });
    }

    res.status(500).json({
      error: "An internal server error occurred",
      details: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { token, user } = await loginUser(username, password);

    // Log user and token for debugging
    console.log("User:", user);
    console.log("Token:", token);

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    // Log the error for debugging
    console.error("Login Error:", error);
    res.status(500).json({ error: error.message });
  }
};
