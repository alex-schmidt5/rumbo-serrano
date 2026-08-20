import { sequelize } from '../config/database.js';
import { DetalleReserva } from '../models/DetalleReserva.js';

export default {
  up: async () => {
    const queryInterface = sequelize.getQueryInterface();
    const tableName = DetalleReserva.getTableName();

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await queryInterface.bulkDelete(tableName, null, { truncate: true, cascade: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    await queryInterface.bulkInsert(tableName, [
      {
        reserva_id: 1,
        actividad_id: 1,
        cantidad: 1,
        precio_unitario: 15000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reserva_id: 2,
        actividad_id: 2,
        cantidad: 3,
        precio_unitario: 10000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reserva_id: 3,
        actividad_id: 3,
        cantidad: 1,
        precio_unitario: 12000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async () => {
    const queryInterface = sequelize.getQueryInterface();
    const tableName = DetalleReserva.getTableName();
    await queryInterface.bulkDelete(tableName, null, {});
  }
};