import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Usuario = sequelize.define("Usuario", {
  usuario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_usuario: DataTypes.STRING,
  email: DataTypes.STRING,
  contraseña: DataTypes.STRING,
  nombre: DataTypes.STRING,
  apellido: DataTypes.STRING,
  telefono: DataTypes.STRING,
  rol: DataTypes.STRING
});