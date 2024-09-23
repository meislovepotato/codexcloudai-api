import express from "express";
import dotenv from "dotenv";
import userBookRouter from "./routes/userBookRouter.js";
import sequelize from "./config/config.js";
import authRouter from "./routes/authRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import Review from "./models/review.js";
import UserBook from "./models/userBook.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/user-books", userBookRouter); // Use the new router
app.use("/auth", authRouter); // Define the auth routes under /auth
app.use("/reviews", reviewRouter);

// Sync the models in the correct order
sequelize.sync({ alter: true }).then(async () => {
  await UserBook.sync(); // Sync the Book model first
  await Review.sync(); // Then sync the Review model
  console.log("Database synchronized");

  // Start the server only after the models are synced
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
});
