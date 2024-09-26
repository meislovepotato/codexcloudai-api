//follow.js
import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

const Follow = sequelize.define(
  "Follow",
  {
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Ensure this references the correct table name
        key: "id",
      },
    },
    followedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Ensure this references the correct table name
        key: "id",
      },
    },
  },
  {
    tableName: "follows",
    timestamps: false,
  }
);

Follow.associate = (models) => {
  Follow.belongsTo(models.User, { foreignKey: "followerId", as: "follower" });
  Follow.belongsTo(models.User, { foreignKey: "followedId", as: "followed" });
};

export default Follow;
