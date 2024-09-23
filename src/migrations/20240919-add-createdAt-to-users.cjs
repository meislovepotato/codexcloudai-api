//20240919-add-createdAt-to-users.js
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "createdAt", {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("NOW()"),
    });

    // If needed, remove the default value
    await queryInterface.changeColumn("users", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "createdAt");
  },
};
