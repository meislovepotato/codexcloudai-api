//authRouter.js
import express from "express";
import { login, register } from "../controllers/authController.js";

const authRouter = express.Router();

// Define routes for registration and login
authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;