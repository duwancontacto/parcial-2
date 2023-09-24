import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Account = sequelize.define("Account", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
