import Sequelize from "sequelize";

import { config } from "dotenv";
config();

export const sequelize = new Sequelize(
  "marcb",
  "yc2qr2bkiyyhos7zv8mc",
  "pscale_pw_QgwqNOBgEzUrA6ScUU3BzfQjnOuaKhxWCCqGPq7ls0g",
  {
    host: "aws.connect.psdb.cloud",
    //port: process.env.MYSQLDB_PORT,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
      },
    },
  }
);

export async function connectSequelize() {
  try {
    await sequelize.sync();
    console.log("Connected database");
  } catch (error) {
    console.log("Error", error);
  }
}
