import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

// Define the UserBook model
const UserBook = sequelize.define(
  "UserBook",
  {
    character: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user_books", // The single table where both fields are stored
    timestamps: false,
    indexes: [
      {
        unique: true, // This will enforce uniqueness on the combination of character and book_name
        fields: ["character", "book_name"],
      },
    ],
  }
);

export default UserBook;
