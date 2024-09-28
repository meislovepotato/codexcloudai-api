//userBookRouter.js
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  addCharacterAndBook,
  getUserBooks,
} from "../controllers/userBookController.js";

const userBookRouter = express.Router();

// Protected route - only authenticated users can add characters and books
userBookRouter.post("/add", authenticate, addCharacterAndBook);
// Public route - no authentication required
userBookRouter.get("/", getUserBooks);

export default userBookRouter;
