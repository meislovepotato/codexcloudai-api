import Post from "../models/post.js";
import User from "../models/user.js";

export const createPostService = async (userId, content) => {
  return await Post.create({ userId, content });
};

export const getAllPostsService = async () => {
  return await Post.findAll({
    attributes: ["userId", "content"],
    include: [{ model: User, as: "user", attributes: ["id", "username"] }],
  });
};

export const getUserPostsService = async (userId) => {
  return await Post.findAll({
    where: { userId },
    include: [{ model: User, as: "user", attributes: ["id", "username"] }],
  });
};


export const deletePostService = async (postId, userId) => {
  // Find the post by id and check if it belongs to the user
  const post = await Post.findOne({ where: { id: postId, userId } });
  
  if (!post) {
    throw new Error("Post not found or unauthorized to delete");
  }

  // Delete the post
  await post.destroy();
};