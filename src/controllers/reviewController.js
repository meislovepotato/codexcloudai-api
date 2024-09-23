// src/controllers/reviewController.js
import Review from "../models/review.js";
import User from "../models/user.js";

// Create a review for a book
export const createReview = async (req, res) => {
  const { bookId, content, rating } = req.body;

  try {
    const userId = req.user.userId; // Extracted from JWT in middleware
    const newReview = await Review.create({
      userId,
      bookId,
      content,
      rating,
    });

    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReviews = async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await Review.findAll({
      where: { bookId },
      include: [
        {
          model: User, // Include the user who wrote the review
          attributes: ["id", "username"], // Only include user details like username
        },
      ],
    });

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this book" });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
