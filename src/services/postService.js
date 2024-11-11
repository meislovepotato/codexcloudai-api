import Post from "../models/post.js";
import User from "../models/user.js";

export const createPostService = async (userId, content) => {
  return await Post.create({ userId, content });
};

export const getAllPostsService = async () => {
  return await Post.findAll({
    attributes: ["userId", "content"],
    include: [{ model: User, as: "user", attributes: ["id", "content"] }],
  });
};

export const getUserPostsService = async (userId) => {
  return await Post.findAll({
    where: { userId },
    include: [{ model: Post, as: "post", attributes: ["id", "username"] }],
  });
};
