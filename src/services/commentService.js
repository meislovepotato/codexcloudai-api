import Comment from "../models/comment.js";

// Create a new comment
export const createCommentService = async (userId, postId, content) => {
  return await Comment.create({ userId, postId, content });
};

// Edit an existing comment
export const editCommentService = async (commentId, userId, content) => {
  const comment = await Comment.findOne({ where: { id: commentId, userId } });
  if (!comment) throw new Error("Comment not found or unauthorized");
  comment.content = content;
  await comment.save();
  return comment;
};

// Delete a comment
export const deleteCommentService = async (commentId, userId) => {
  const comment = await Comment.findOne({ where: { id: commentId, userId } });
  if (!comment) throw new Error("Comment not found or unauthorized");
  await comment.destroy();
};
