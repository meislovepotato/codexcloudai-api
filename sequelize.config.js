import dotenv from "dotenv";

dotenv.config();

const commonConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || "postgres",
  port: process.env.DB_PORT || 5432,
  dialectOptions: {
    ssl: process.env.DB_SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
  },
};

export default {
  development: { ...commonConfig },
  test: { ...commonConfig },
  production: { ...commonConfig },
};
