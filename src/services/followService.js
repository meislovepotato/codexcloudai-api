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
  const followers = await Follow.findAll({
    where: {
      followingId: userId,
    },
    include: [{ model: User, as: "followers", attributes: ["id", "username"] }],
  });

  if (!followers) {
    throw new Error("No followers found");
  }

  return followers;
};

// Get users a user is following
export const getUserFollowing = async (userId) => {
  const following = await Follow.findAll({
    where: { 
      followerId: userId 
    },
    include: [{ model: User, as: "following", attributes: ["id", "username"] }],
  });

  if (!following) {
    throw new Error("No following found");
  }

  return following;
};
