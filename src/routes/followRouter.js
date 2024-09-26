// followRouter.js
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  followUser,
  getFollowers,
  getFollowing,
  unfollowUser,
} from "../controllers/followController.js";

const followRouter = express.Router();
followRouter.use(authenticate);

// Routes for follow/unfollow
followRouter.post("/follow/:followingId", followUser); // Follow a user
followRouter.post("/unfollow/:followingId", unfollowUser); // Unfollow a user
followRouter.get("/followers/:userId", getFollowers); // Get followers of a user
followRouter.get("/following/:userId", getFollowing); // Get users a user is following

export default followRouter;
