import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/config.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import User from "./models/user.js";
import Follow from "./models/follow.js";
import Post from "./models/post.js";
import Like from "./models/like.js";
import Comment from "./models/comment.js";

import authRouter from "./routes/authRouter.js";
import followRouter from "./routes/followRouter.js";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js"
import likeRouter from "./routes/likeRouter.js";
import commentRouter from "./routes/commentRouter.js";


dotenv.config();

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true, 
  })
);

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CodexCloud Authentication API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "api-docs",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
const specs = swaggerJsdoc(options);
app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(specs));

app.use(express.json());
app.use("/auth", authRouter); 
app.use("/api", postRouter);
app.use("/like", likeRouter);
app.use("/profile", userRouter);
app.use("/follow", followRouter);
app.use("/comments", commentRouter);

sequelize
  .sync()
  .then(async () => {
    console.log("Database synchronized");

    // Initialize associations after syncing
    const models = { User, Follow, Post, Like, Comment}; // Create a models object
    User.associate(models);
    Follow.associate(models); // Ensure Follow model associations are initialized
    Post.associate(models); 
    Like.associate(models); 
    Comment.associate(models);

    // Start the server only after the models are synced
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing the database:", error);
  });
