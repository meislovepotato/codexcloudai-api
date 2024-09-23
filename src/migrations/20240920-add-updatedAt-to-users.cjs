module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "updatedAt", {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("NOW()"),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "updatedAt");
  },
};
