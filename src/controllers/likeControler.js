// controllers/likeController.js
import { checkLikeStatusService, toggleLikeService } from "../services/likeService.js";

export const checkLikeStatus = async (req, res) => {
  const userId = req.user.userId; // Extract user ID from authenticated request
  const { postId } = req.params;

  try {
    const liked = await checkLikeStatusService(userId, postId);
    res.status(200).json({ liked });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleLike = async (req, res) => {
  const userId = req.user.userId; // Assume `req.user.userId` has the logged-in user's ID
  const { postId } = req.params;

  try {
    const result = await toggleLikeService(userId, postId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
