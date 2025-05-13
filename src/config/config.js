import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Create a Sequelize instance using the DATABASE_URL
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true, // Ensure SSL for Neon/Postgres cloud
      rejectUnauthorized: false,
    },
  },
});

console.log(`🌐 Connecting to database: ${process.env.DB_URL}`);

export default sequelize;