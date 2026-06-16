import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ItemCarrito = sequelize.define("ItemCarrito", {
  item_carrito_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cantidad: DataTypes.INTEGER
});