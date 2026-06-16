import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Reserva = sequelize.define("Reserva", {
  reserva_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha_reserva: DataTypes.DATE,
  precio_id: DataTypes.DECIMAL(10,2),
  estado: DataTypes.STRING
});