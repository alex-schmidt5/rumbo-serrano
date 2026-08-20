import { sequelize } from '../config/database.js';

export default {
  up: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.bulkInsert('categorias', [
      {
        nombre: 'Kayak',
        descripcion: 'Actividades recreativas y guiadas en kayak.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Trekking',
        descripcion: 'Caminatas y recorridos por senderos serranos.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Avistaje de Aves',
        descripcion: 'Observación de aves en entornos naturales.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Cabalgatas',
        descripcion: 'Recorridos guiados a caballo.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.bulkDelete('categorias', null, {});
  }
};