import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const DetalleReserva = sequelize.define("DetalleReserva", {
  detalle_reserva_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});