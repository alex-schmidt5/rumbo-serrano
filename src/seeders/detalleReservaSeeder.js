import { sequelize } from '../config/database.js';

export default {
  up: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.bulkInsert('detallereservas', [
      {
        reserva_id: 1,
        actividades_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reserva_id: 2,
        actividades_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reserva_id: 3,
        actividades_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.bulkDelete('detallereservas', null, {});
  }
};