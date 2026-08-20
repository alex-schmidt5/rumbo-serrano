import { sequelize } from '../config/database.js';

export default {
  up: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await queryInterface.bulkDelete('reservas', null, { truncate: true, cascade: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    await queryInterface.bulkInsert('reservas', [
      {
        fecha_reserva: new Date(),
        total: 15000, // <-- Cambiado a 'total'
        estado: 'confirmada', // <-- En minúsculas según el ENUM
        usuario_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fecha_reserva: new Date(),
        total: 30000,
        estado: 'pendiente',
        usuario_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fecha_reserva: new Date(),
        total: 12000,
        estado: 'cancelada',
        usuario_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async () => {
    const queryInterface = sequelize.getQueryInterface();
    await queryInterface.bulkDelete('reservas', null, {});
  }
};