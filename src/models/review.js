import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";
import UserBook from "./userBook.js";
import User from "./user.js";

const Review = sequelize.define("Review", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "users", // Table name
      key: "id",
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: "user_books", // Table name
      key: "id",
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Review.belongsTo(User, { foreignKey: "userId" }); // A review belongs to a user
Review.belongsTo(UserBook, { foreignKey: "bookId" }); // A review belongs to a userBook

export default Review;
