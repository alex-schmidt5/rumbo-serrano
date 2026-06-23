import { sequelize } from '../config/database.js';

export default {
  up: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.bulkInsert('actividads', [
      {
        titulo: 'Kayak en Embalse',
        descripcion: 'Recorrido guiado por el lago.',
        precio: 15000,
        duracion: '2 horas',
        ubicacion: 'Embalse',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Trekking Cerro de la Virgen',
        descripcion: 'Senderismo con guía especializado.',
        precio: 10000,
        duracion: '3 horas',
        ubicacion: 'Villa General Belgrano',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Avistaje de Aves',
        descripcion: 'Observación de aves autóctonas.',
        precio: 12000,
        duracion: '2 horas',
        ubicacion: 'Lago Los Molinos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Cabalgata Serrana',
        descripcion: 'Recorrido a caballo por las sierras.',
        precio: 18000,
        duracion: '4 horas',
        ubicacion: 'Calamuchita',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.bulkDelete('actividads', null, {});
  }
};