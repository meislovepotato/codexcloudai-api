//config.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
    port: process.env.DB_PORT || 5432,
  }
);

console.log(`Connecting to database with user: ${process.env.DB_USER}`);
export default sequelize;
