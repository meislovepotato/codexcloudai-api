import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createComment,
  editComment,
  deleteComment,
} from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.use(authenticate);

// Routes for comments
commentRouter.post("/:postId", createComment); // Create a comment on a post
commentRouter.put("/:commentId", editComment); // Edit a specific comment
commentRouter.delete("/:commentId", deleteComment); // Delete a specific comment

export default commentRouter;
