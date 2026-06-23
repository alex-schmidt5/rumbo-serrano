import { sequelize } from '../config/database.js';

export default {
  up: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.bulkInsert('itemcarritos', [
      {
        cantidad: 2,
        carrito_id: 1,
        actividades_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cantidad: 1,
        carrito_id: 1,
        actividades_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cantidad: 3,
        carrito_id: 2,
        actividades_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.bulkDelete('itemcarritos', null, {});
  }
};