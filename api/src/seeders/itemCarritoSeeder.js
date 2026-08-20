import { sequelize } from '../config/database.js';

export default {
  up: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await queryInterface.bulkDelete('items_carrito', null, { truncate: true, cascade: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    await queryInterface.bulkInsert('items_carrito', [
      {
        cantidad: 2,
        carrito_id: 1,
        actividad_id: 1, // <-- En singular como en tu modelo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cantidad: 1,
        carrito_id: 1,
        actividad_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cantidad: 3,
        carrito_id: 2,
        actividad_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async () => {
    const queryInterface = sequelize.getQueryInterface();
    await queryInterface.bulkDelete('items_carrito', null, {});
  }
};