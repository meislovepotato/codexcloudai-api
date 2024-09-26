//reviewController.js
import { createReview, getReviewsForBook } from "../services/reviewService.js";

// Create a review for a book
export const createReviewController = async (req, res) => {
  const { bookId, content, rating } = req.body;

  try {
    const userId = req.user.userId; // Extracted from JWT in middleware
    const newReview = await createReview(userId, bookId, content, rating);
    res;

    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReviewsController = async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await getReviewsForBook(bookId);

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
