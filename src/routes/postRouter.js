import express from "express";
import { createPost, deletePost, getAllPosts, getUserPosts } from "../controllers/postController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const postRouter = express.Router();
postRouter.use(authenticate); // Ensure authentication middleware is applied

// Routes for creating, fetching all posts, and fetching user posts
postRouter.post("/createpost", authenticate, createPost); // Create a new post
postRouter.get("/getallposts", getAllPosts); // Get all posts
postRouter.get("/user/:userId", getUserPosts); // Get posts by a specific user
postRouter.delete("/deletepost/:postId", authenticate, deletePost);

export default postRouter;