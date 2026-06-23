import categoriaSeeder from './categoriaSeeder.js';
import actividadSeeder from './actividadSeeder.js';
import usuarioSeeder from './usuarioSeeder.js';
import reservaSeeder from './reservaSeeder.js';
import carritoSeeder from './carritoSeeder.js';
import detalleReservaSeeder from './detalleReservaSeeder.js';
import itemCarritoSeeder from './itemCarritoSeeder.js';

const runSeeders = async () => {
  try {
    await categoriaSeeder.up();
    console.log('✅ Categorías cargadas');

    await actividadSeeder.up();
    console.log('✅ Actividades cargadas');
    await carritoSeeder.up();
console.log('✅ Carritos cargados');

await detalleReservaSeeder.up();
console.log('✅ Detalle de reservas cargado');

await itemCarritoSeeder.up();
console.log('✅ Items de carrito cargados');

    await usuarioSeeder.up();
    console.log('✅ Usuarios cargados');

    await reservaSeeder.up();
    console.log('✅ Reservas cargadas');

    console.log('🎉 Todos los seeders ejecutados');
  } catch (error) {
    console.error('❌ Error ejecutando seeders:', error);
  }
};

runSeeders();