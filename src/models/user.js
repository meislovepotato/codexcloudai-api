//user.js
import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";
import argon2 from "argon2";

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validates if it's a valid email
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
  }
);

User.associate = (models) => {
  User.hasMany(models.Review, { foreignKey: "userId" });
  User.hasMany(models.Follow, { foreignKey: "followerId", as: "followers" });
  User.hasMany(models.Follow, {
    foreignKey: "followedId",
    as: "followedUsers",
  });
  User.hasMany(models.UserBook, { foreignKey: "userId" });
};

export default User;
