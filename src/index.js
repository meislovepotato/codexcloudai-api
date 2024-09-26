import express from "express";
import dotenv from "dotenv";
import userBookRouter from "./routes/userBookRouter.js";
import sequelize from "./config/config.js";
import authRouter from "./routes/authRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import Review from "./models/review.js";
import UserBook from "./models/userBook.js";
import User from "./models/user.js"; // Correct import for User
import Follow from "./models/follow.js"; // Make sure to import Follow
import followRouter from "./routes/followRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/user-books", userBookRouter); // Use the new router
app.use("/auth", authRouter); // Define the auth routes under /auth
app.use("/profile", userRouter);
app.use("/reviews", reviewRouter);
app.use("/follow", followRouter);

// Sync the models in the correct order
sequelize.sync()
  .then(async () => {
    console.log("Database synchronized");

    // Initialize associations after syncing
    const models = { User, UserBook, Review, Follow }; // Create a models object
    User.associate(models);
    UserBook.associate(models);
    Review.associate(models);
    Follow.associate(models); // Ensure Follow model associations are initialized

    // Start the server only after the models are synced
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing the database:", error);
  });
