import bcrypt from 'bcryptjs';
import { sequelize } from '../config/database.js';

export default {
  up: async () => {
    const queryInterface = sequelize.getQueryInterface();

    // Generar el hash usando la misma librería que el controlador
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('1234', salt);

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await queryInterface.bulkDelete('usuarios', null, { truncate: true, cascade: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    await queryInterface.bulkInsert('usuarios', [
      {
        nombre_usuario: 'admin',
        email: 'admin@turismo.com',
        password: passwordHash,
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
        password: passwordHash,
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