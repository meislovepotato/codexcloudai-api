//userService.js
import User from "../models/user.js";
import Review from "../models/review.js";

export const getUserProfileById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "role"], // Exclude sensitive info like password
      include: [
        { model: Review }, // Include the reviews the user has written
        {
          model: User,
          as: "Following", // Users they are following
          attributes: ["id", "username"],
        },
        {
          model: User,
          as: "Followers", // Users who are following this user
          attributes: ["id", "username"],
        },
      ],
    });

    return user; // Return the user object
  } catch (error) {
    throw new Error(error.message); // Handle errors appropriately
  }
};
