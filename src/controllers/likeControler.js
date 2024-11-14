// controllers/likeController.js
import { toggleLikeService } from "../services/likeService.js";


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
