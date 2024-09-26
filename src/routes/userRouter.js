//userRouter.js
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getUserProfile } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.get("/myprofile", authenticate, getUserProfile);

export default userRouter;
