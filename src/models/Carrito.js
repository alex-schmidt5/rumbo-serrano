import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Carrito = sequelize.define("Carrito", {
  carrito_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});