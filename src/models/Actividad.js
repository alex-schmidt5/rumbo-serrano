import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Actividad = sequelize.define("Actividad", {
  actividades_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: DataTypes.STRING,
  descripcion: DataTypes.TEXT,
  precio: DataTypes.DECIMAL(10,2),
  duracion: DataTypes.STRING,
  ubicacion: DataTypes.STRING
});