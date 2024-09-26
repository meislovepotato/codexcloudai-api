//userBookRouter.js
import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import {
  addCharacterAndBook,
  getAllEntries,
} from "../controllers/userBookController.js";

const userBookRouter = express.Router();

// Public route - no authentication required
userBookRouter.get("/all", getAllEntries);

// Protected route - only authenticated users can add characters and books
userBookRouter.post("/add", authenticate, addCharacterAndBook);

// Admin-only route (example) - only users with the "admin" role can access this
userBookRouter.post(
  "/admin/add",
  authenticate,
  authorize("admin"),
  addCharacterAndBook
);

export default userBookRouter;
