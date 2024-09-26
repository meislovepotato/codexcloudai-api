//userController.js
import { getUserProfileById } from "../services/userService.js";

// Fetch the current user's profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the JWT token in the authMiddleware
    const user = await getUserProfileById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
