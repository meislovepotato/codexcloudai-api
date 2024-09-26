//reviewService.js
import Review from "../models/review.js";
import User from "../models/user.js";

// Service to create a new review
export const createReview = async (userId, bookId, content, rating) => {
  try {
    const newReview = await Review.create({
      userId,
      bookId,
      content,
      rating,
    });
    return newReview;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to get all reviews for a specific book
export const getReviewsForBook = async (bookId) => {
  try {
    const reviews = await Review.findAll({
      where: { bookId },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });
    return reviews;
  } catch (error) {
    throw new Error(error.message);
  }
};
