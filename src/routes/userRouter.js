// src/routes/userRouter.js
import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { getUserProfile } from "../controllers/userController";


const userRouter = express.Router();

userRouter.get("/profile", authenticate, getUserProfile);

export default userRouter;
