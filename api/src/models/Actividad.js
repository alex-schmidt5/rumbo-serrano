import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Actividad = sequelize.define('Actividad', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: DataTypes.TEXT,
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  duracion: DataTypes.STRING,
  ubicacion: DataTypes.STRING,
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { tableName: 'actividades' });