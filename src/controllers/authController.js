//authController.js
import { loginUser, registerUser } from "../services/authService.js";
import { validatePassword, validateRegisterInput } from "../utils/validation.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate request body
  const validationError = validateRegisterInput({ username, email, password });
  if (validationError) return res.status(400).json({ error: validationError });

  if (!validatePassword(password)) {
    return res.status(400).json({
      error: "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.",
    });
  }

  try {
    const newUser = await registerUser(username, email, password);
    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.error(error);

    if (error.message === "Email is already in use" || error.message === "Username is already in use") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({
      error: "An internal server error occurred",
      details: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const { token, user } = await loginUser(identifier, password);

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
