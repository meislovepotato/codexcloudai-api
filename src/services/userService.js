//userService.js
import User from "../models/user.js";
import { getUserFollowers, getUserFollowing } from "./followService.js";

export const getUserProfileById = async (userId) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
      attributes: ["id", "username"], // Exclude sensitive info like password
      // include: [{ model: Review, as: "reviews" }],
      raw: true,
    });
    //{ username: string, Review: {sadfsadfcasdf}}

    const Followers = await getUserFollowers(userId);
    //[{id, username}, {id, username}]
    const Following = await getUserFollowing(userId);
    // [{id, username}, {id, username}]

    const completeDataUser = { ...user, Followers, Following };
    //{ username: string, Review: {sadfsadfcasdf}, Followers: [{id, username}, {id, username}], Following: [{id, username}, {id, username}]}

    return user, completeDataUser; // Return the user object
  } catch (error) {
    throw new Error(error.message); // Handle errors appropriately
  }
};
