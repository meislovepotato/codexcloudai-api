import Follow from "../models/follow.js";
import User from "../models/user.js";

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
    const existingFollow = await Follow.findOne({
      where: { followerId, followingId },
    });
    if (existingFollow) {
      return res
        .status(400)
        .json({ error: "You are already following this user" });
    }

    // Create a new follow relationship
    await Follow.create({ followerId, followingId });

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
    const follow = await Follow.findOne({ where: { followerId, followingId } });
    if (!follow) {
      return res.status(400).json({ error: "You are not following this user" });
    }

    // Remove the follow relationship
    await follow.destroy();

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all followers of a user
export const getFollowers = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: [
        { model: User, as: "Followers", attributes: ["id", "username"] },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ followers: user.Followers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users a user is following
export const getFollowing = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: [
        { model: User, as: "Following", attributes: ["id", "username"] },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ following: user.Following });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
