// src/controllers/userController.js
import Review from "../models/review.js";
import User from "../models/user.js";
import Follow from "../models/follow.js";

// Fetch the current user's profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the JWT token in the authMiddleware
    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "role"], // Exclude sensitive info like password
      include: [
        { model: Review }, // Include the reviews the user has written
        {
          model: User,
          as: "Following", // Users they are following
          attributes: ["id", "username"],
        },
        {
          model: User,
          as: "Followers", // Users who are following this user
          attributes: ["id", "username"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
