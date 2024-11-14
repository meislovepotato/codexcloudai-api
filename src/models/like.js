import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

const Like = sequelize.define("Like", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "posts",
      key: "id",
    },
  },
}, {
  tableName: "likes",
  timestamps: true,
});

Like.associate = (models) => {
  Like.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  Like.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
};

export default Like;