import { sequelize } from '../config/database.js';
import categoriaSeeder from './categoriaSeeder.js';
import actividadSeeder from './actividadSeeder.js';
import usuarioSeeder from './usuarioSeeder.js';
import reservaSeeder from './reservaSeeder.js';
import carritoSeeder from './carritoSeeder.js';
import detalleReservaSeeder from './detalleReservaSeeder.js';
import itemCarritoSeeder from './itemCarritoSeeder.js';

const runSeeders = async () => {
  try {
    // Desactivar restricciones FK globalmente durante la siembra
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    await categoriaSeeder.up();
    console.log('✅ Categorías cargadas');

    await actividadSeeder.up();
    console.log('✅ Actividades cargadas');

    await usuarioSeeder.up();
    console.log('✅ Usuarios cargados');

    await carritoSeeder.up();
    console.log('✅ Carritos cargados');

    await reservaSeeder.up();
    console.log('✅ Reservas cargadas');

    await itemCarritoSeeder.up();
    console.log('✅ Items de carrito cargados');

    await detalleReservaSeeder.up();
    console.log('✅ Detalle de reservas cargado');

    console.log('🎉 Todos los seeders ejecutados con éxito');
  } catch (error) {
    console.error('❌ Error ejecutando seeders:', error);
  } finally {
    // Reactivar restricciones FK y cerrar la conexión
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    await sequelize.close();
  }
};

runSeeders();