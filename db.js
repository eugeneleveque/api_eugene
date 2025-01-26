import sql from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const config = new sql.Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
    port: process.env.DB_PORT,
  }
);

export default config;
