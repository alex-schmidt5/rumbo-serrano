import { sequelize } from '../config/database.js';

export default {
  up: async () => {
    const queryInterface = sequelize.getQueryInterface();

    // 1. Limpia la tabla y reinicia los IDs para evitar acumulaciones
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await queryInterface.bulkDelete('actividades', null, { truncate: true, cascade: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    // 2. Inserta los datos limpios
    await queryInterface.bulkInsert('actividades', [
      {
        titulo: 'Kayak en Embalse',
        descripcion: 'Recorrido guiado por el lago.',
        precio: 15000,
        duracion: '2 horas',
        ubicacion: 'Embalse',
        categoria_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Trekking Cerro de la Virgen',
        descripcion: 'Senderismo con guía especializado.',
        precio: 10000,
        duracion: '3 horas',
        ubicacion: 'Villa General Belgrano',
        categoria_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Avistaje de Aves',
        descripcion: 'Observación de aves autóctonas.',
        precio: 12000,
        duracion: '2 horas',
        ubicacion: 'Lago Los Molinos',
        categoria_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Cabalgata Serrana',
        descripcion: 'Recorrido a caballo por las sierras.',
        precio: 18000,
        duracion: '4 horas',
        ubicacion: 'Calamuchita',
        categoria_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async () => {
    const queryInterface = sequelize.getQueryInterface();
    await queryInterface.bulkDelete('actividades', null, {});
  }
};