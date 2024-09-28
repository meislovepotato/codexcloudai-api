//userBook.js
import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

// Define the UserBook model
const UserBook = sequelize.define(
  "UserBook",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    character: {
      type: DataTypes.STRING, // Character field
      allowNull: true, // Allow it to be nullable if not all books have characters
    },
  },
  {
    tableName: "user_books",
    timestamps: true, // Add timestamps
  }
);

// Association method for UserBook
UserBook.associate = (models) => {
  UserBook.belongsTo(models.User, { foreignKey: "userId" });
  UserBook.hasMany(models.Review, { foreignKey: "bookId" });
};

// Export the UserBook model
export default UserBook;
