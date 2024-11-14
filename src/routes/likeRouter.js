// routes/likeRouter.js
import express from "express";
import { toggleLike } from "../controllers/likeControler.js";
import { authenticate } from "../middleware/authMiddleware.js";

const likeRouter = express.Router();
likeRouter.use(authenticate);

likeRouter.post("/toggle/:postId", toggleLike);

export default likeRouter;
