import { sequelize } from '../config/database.js';

export default {
  up: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.bulkInsert('usuarios', [
      {
        nombre_usuario: 'admin',
        email: 'admin@turismo.com',
        contraseña: '1234',
        nombre: 'Administrador',
        apellido: 'Sistema',
        telefono: '000000000',
        rol: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre_usuario: 'Pepe',
        email: 'pepe@gmail.com',
        contraseña: '1234',
        nombre: 'Pepe',
        apellido: 'Perez',
        telefono: '3546123456',
        rol: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.bulkDelete('usuarios', null, {});
  }
};