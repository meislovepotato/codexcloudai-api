// 20240910-add-create-users-with-auth.cjs
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "user", // You can use "admin" or "moderator" for other roles
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "active", // Can be "active", "banned", "inactive"
      },
      passwordResetToken: {
        type: Sequelize.STRING, // For password reset functionality
        allowNull: true,
      },
      passwordResetExpires: {
        type: Sequelize.DATE, // Expiration time for reset token
        allowNull: true,
      },
      lastLogin: {
        type: Sequelize.DATE, // Track last login
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
