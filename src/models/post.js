import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

const Post = sequelize.define("Post", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "posts",
});

Post.associate = (models) => {
  Post.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  Post.hasMany(models.Like, { foreignKey: "postId", as: "likes" });
};

export default Post;