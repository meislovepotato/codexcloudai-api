//authController.js
import { loginUser, registerUser } from "../services/authService.js";

export const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const newUser = await registerUser(username, password, role);

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { token, user } = await loginUser(username, password);

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
