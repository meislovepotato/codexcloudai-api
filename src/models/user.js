//user.js
import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";
import bcrypt from "bcrypt";

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
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
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
