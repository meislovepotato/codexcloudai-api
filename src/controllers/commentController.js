import * as commentService from "../services/commentService.js";

// Create a comment
export const createComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.user.userId;

  try {
    const comment = await commentService.createCommentService(userId, postId, content);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit a comment
export const editComment = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user.userId;

  try {
    const updatedComment = await commentService.editCommentService(commentId, userId, content);
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.userId;

  try {
    await commentService.deleteCommentService(commentId, userId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
