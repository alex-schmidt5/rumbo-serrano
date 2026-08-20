    import { Router } from 'express';
    import { Carrito, ItemCarrito, Actividad } from '../models/index.js';
    import { verificarToken } from '../middlewares/authMiddleware.js';

    const router = Router();

    // GET: Obtener el carrito del usuario autenticado (se crea si no existe)
    router.get('/', verificarToken, async (req, res) => {
    try {
        const [carrito] = await Carrito.findOrCreate({
        where: { usuario_id: req.usuario.id },
        include: [{
            model: ItemCarrito,
            include: [Actividad]
        }]
        });
        res.json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    // POST: Agregar actividad al carrito
    router.post('/items', verificarToken, async (req, res) => {
    try {
        const { actividad_id, cantidad } = req.body;

        const [carrito] = await Carrito.findOrCreate({
        where: { usuario_id: req.usuario.id }
        });

        let item = await ItemCarrito.findOne({
        where: { carrito_id: carrito.id, actividad_id }
        });

        if (item) {
        item.cantidad += (cantidad || 1);
        await item.save();
        } else {
        item = await ItemCarrito.create({
            carrito_id: carrito.id,
            actividad_id,
            cantidad: cantidad || 1
        });
        }

        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    });

    // DELETE: Eliminar un ítem del carrito por su id
    router.delete('/items/:id', verificarToken, async (req, res) => {
    try {
        const eliminados = await ItemCarrito.destroy({
        where: { id: req.params.id }
        });
        if (!eliminados) return res.status(404).json({ mensaje: 'Ítem no encontrado' });

        res.json({ mensaje: 'Ítem eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    export default router;