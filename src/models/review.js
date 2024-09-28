//review.js
import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

// Define the Review model
const Review = sequelize.define(
  "Review",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user_books",
        key: "id",
      },
    },
  },
  {
    tableName: "reviews",
  }
);

// Association method for Review
Review.associate = (models) => {
  Review.belongsTo(models.User, {
    foreignKey: "userId",
    allowNull: true,
  });
  Review.belongsTo(models.UserBook, { foreignKey: "bookId" });
};

// Export the Review model
export default Review;
