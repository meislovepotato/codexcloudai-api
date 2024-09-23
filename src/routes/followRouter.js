// followRouter.js
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";


const followRouter = express.Router();

// Routes for follow/unfollow
followRouter.post("/follow/:followingId", authenticate, followUser); // Follow a user
followRouter.post("/unfollow/:followingId", authenticate, unfollowUser); // Unfollow a user
followRouter.get("/followers/:userId", authenticate, getFollowers); // Get followers of a user
followRouter.get("/following/:userId", authenticate, getFollowing); // Get users a user is following

export default followRouter;
