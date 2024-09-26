//followService.js
import Follow from "../models/follow.js";
import User from "../models/user.js";

// Create a follow relationship
export const createFollow = async (followerId, followingId) => {
  const existingFollow = await Follow.findOne({
    where: { followerId, followingId },
  });

  if (existingFollow) {
    throw new Error("You are already following this user");
  }

  await Follow.create({ followerId, followingId });
};

// Remove a follow relationship
export const removeFollow = async (followerId, followingId) => {
  const follow = await Follow.findOne({ where: { followerId, followingId } });
  if (!follow) {
    throw new Error("You are not following this user");
  }

  await follow.destroy();
};

// Get followers of a user
export const getUserFollowers = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [{ model: User, as: "Followers", attributes: ["id", "username"] }],
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.Followers;
};

// Get users a user is following
export const getUserFollowing = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [{ model: User, as: "Following", attributes: ["id", "username"] }],
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.Following;
};
