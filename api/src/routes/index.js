import { Router } from 'express';
import usuarioRoutes from './usuarioRoutes.js';
import actividadRoutes from './actividadRoutes.js';
import categoriaRoutes from './categoriaRoutes.js';
import reservaRoutes from './reservaRoutes.js';
import carritoRoutes from './carritoRoutes.js';

const router = Router();

router.use('/usuarios', usuarioRoutes);
router.use('/actividades', actividadRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/reservas', reservaRoutes);
router.use('/carrito', carritoRoutes);

export default router;