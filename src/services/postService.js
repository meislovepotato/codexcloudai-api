//postService.js
import sequelize from "../config/config.js";
import Comment from "../models/comment.js";
import Like from "../models/like.js";
import Post from "../models/post.js";
import User from "../models/user.js";

export const createPostService = async (userId, content) => {
  return await Post.create({ userId, content });
};

export const getAllPostsService = async () => {
  return await Post.findAll({
    attributes: [
      "id",
      "userId",
      "content",
      [sequelize.fn("COUNT", sequelize.col("likes.id")), "likeCount"],
    ],
    include: [
      { model: User, as: "user", attributes: ["id", "username"] },
      { model: Like, as: "likes", attributes: [] }, // Include likes for counting
      { model: Comment, as: "comments", attributes: ["id", "content", "userId"] },
    ],
    group: ["Post.id", "user.id", "comments.id"] // Grouping by Post and User to avoid duplicate entries
  });
};

export const getUserPostsService = async (userId) => {
  return await Post.findAll({
    where: { userId },
    attributes: [
      "id",
      "userId",
      "content",
      [sequelize.fn("COUNT", sequelize.col("likes.id")), "likeCount"]
    ],
    include: [
      { model: User, as: "user", attributes: ["id", "username"] },
      { model: Like, as: "likes", attributes: [] },
      { model: Comment, as: "comments", attributes: ["id", "content", "userId"] },
    ],
    group: ["Post.id", "user.id", "comments.id"]
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
