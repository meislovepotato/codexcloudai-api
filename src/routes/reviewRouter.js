//reviewRouter.js
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createReviewController,
  getReviewsController,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", authenticate, createReviewController);
reviewRouter.get("/:bookId", getReviewsController);

export default reviewRouter;
