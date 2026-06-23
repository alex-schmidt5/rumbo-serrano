import { sequelize } from '../config/database.js';

export default {
  up: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.bulkInsert('carritos', [
      {
        usuario_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuario_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.bulkDelete('carritos', null, {});
  }
};