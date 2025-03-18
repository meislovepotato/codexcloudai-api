import sequelize from "./src/config/config.js";

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to the Neon database!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};

testConnection();
