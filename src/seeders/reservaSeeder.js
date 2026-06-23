import { sequelize } from '../config/database.js';

export default {
  up: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.bulkInsert('reservas', [
      {
        fecha_reserva: new Date(),
        precio_total: 15000.00,
        estado: 'Confirmada',
        usuario_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fecha_reserva: new Date(),
        precio_total: 30000.00,
        estado: 'Pendiente',
        usuario_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fecha_reserva: new Date(),
        precio_total: 12000.00,
        estado: 'Cancelada',
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