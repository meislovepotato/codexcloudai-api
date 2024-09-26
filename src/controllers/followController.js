//followController.js
import * as followService from "../services/followService.js";

// Follow a user
export const followUser = async (req, res) => {
  const followerId = req.user.userId; // Get the logged-in user's ID
  const { followingId } = req.params;

  try {
    // Check if user is trying to follow themselves
    if (followerId === parseInt(followingId, 10)) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    // Check if the follow relationship already exists
    await followService.createFollow(followerId, followingId);

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  const followerId = req.user.userId; // Get the logged-in user's ID
  const { followingId } = req.params;

  try {
    // Check if the follow relationship exists
    await followService.removeFollow(followerId, followingId);

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all followers of a user
export const getFollowers = async (req, res) => {
  const { userId } = req.params;

  try {
    const followers = await followService.getUserFollowers(userId);

    res.status(200).json({ followers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users a user is following
export const getFollowing = async (req, res) => {
  const { userId } = req.params;

  try {
    const following = await followService.getUserFollowing(userId);

    res.status(200).json({ following });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
