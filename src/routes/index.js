import { Router } from 'express';
import usuarioRoutes from './usuarioRoutes.js';
import actividadRoutes from './actividadRoutes.js';
import categoriaRoutes from './categoriaRoutes.js';
import reservaRoutes from './reservaRoutes.js';
import detalleReservaRoutes from './detalleReservaRoutes.js';
import carritoRoutes from './carritoRoutes.js';
import itemCarritoRoutes from './itemCarritoRoutes.js';

const router = Router();

router.use('/usuarios', usuarioRoutes);
router.use('/actividades', actividadRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/reservas', reservaRoutes);
router.use('/detalle-reserva', detalleReservaRoutes);
router.use('/carritos', carritoRoutes);
router.use('/items-carrito', itemCarritoRoutes);

export default router;