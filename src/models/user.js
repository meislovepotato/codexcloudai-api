// user.js
import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

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
    role: {
      type: DataTypes.ENUM("user", "admin", "moderator"), // Define roles explicitly
      allowNull: false,
      defaultValue: "user", // Default role
    },
    status: {
      type: DataTypes.ENUM("active", "banned", "inactive"), // Define status explicitly
      allowNull: false,
      defaultValue: "active", // Default status
    },
  },
  {
    tableName: "users",
  }
);

User.associate = (models) => {

  // User can follow many users
  User.hasMany(models.Follow, {
    foreignKey: "followerId",
    as: "followers", 
  });

  // User can be followed by many users
  User.hasMany(models.Follow, {
    foreignKey: "followingId",
    as: "following", 
  });
};

export default User;
