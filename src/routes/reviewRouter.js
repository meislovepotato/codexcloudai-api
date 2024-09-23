//reviewRouter.js
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { createReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", authenticate, createReview);
reviewRouter.get("/:bookId", getReviews);

export default reviewRouter;
