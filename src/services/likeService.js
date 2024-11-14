// services/likeService.js
import Like from "../models/like.js";

export const toggleLikeService = async (userId, postId) => {
  const existingLike = await Like.findOne({
    where: { userId, postId },
  });

  if (existingLike) {
    // If like exists, remove it (unlike)
    await existingLike.destroy();
    return { liked: false };
  } else {
    // If like does not exist, create it
    await Like.create({ userId, postId });
    return { liked: true };
  }
};
