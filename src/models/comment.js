import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";
import Post from "./post.js";
import User from "./user.js";

const Comment = sequelize.define("Comment", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: "id",
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: "comments",
  timestamps: true,
});

// Associations
Comment.associate = (models) => {
  Comment.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  Comment.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
};

export default Comment;
