import express from "express";
import { createPost, getAllPosts, getUserPosts } from "../controllers/postController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const postRouter = express.Router();
postRouter.use(authenticate); // Ensure authentication middleware is applied

// Routes for creating, fetching all posts, and fetching user posts
postRouter.post("/createPost", createPost); // Create a new post
postRouter.get("/getAllPosts", getAllPosts); // Get all posts
postRouter.get("/user/:userId", getUserPosts); // Get posts by a specific user

export default postRouter;