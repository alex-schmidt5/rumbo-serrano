    import { Router } from 'express';
    import { Actividad, Categoria } from '../models/index.js';
    import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

    const router = Router();

    // --- RUTAS PÚBLICAS (Cliente) ---

    // GET TODAS LAS ACTIVIDADES
    router.get('/', async (req, res) => {
    try {
        const actividades = await Actividad.findAll({
        include: Categoria
        });
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    // GET ACTIVIDAD POR ID
    router.get('/:id', async (req, res) => {
    try {
        const actividad = await Actividad.findByPk(req.params.id, {
        include: Categoria
        });
        if (!actividad) return res.status(404).json({ mensaje: 'Actividad no encontrada' });
        res.json(actividad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    // --- RUTAS PROTEGIDAS (Solo Administrador) ---

    // POST (Crear actividad)
    router.post('/', verificarToken, esAdmin, async (req, res) => {
    try {
        const datos = { ...req.body };
        // Si no llega categoria_id o llega vacío, le asignamos 1 por defecto
        if (!datos.categoria_id) {
        datos.categoria_id = 1;
        }
        const nuevaActividad = await Actividad.create(datos);
        res.status(201).json(nuevaActividad);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    });

    // PUT (Editar actividad)
    router.put('/:id', verificarToken, esAdmin, async (req, res) => {
    try {
        const actividad = await Actividad.findByPk(req.params.id);
        if (!actividad) return res.status(404).json({ mensaje: 'Actividad no encontrada' });

        await actividad.update(req.body);
        res.json(actividad);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    });

    // DELETE (Eliminar actividad)
    router.delete('/:id', verificarToken, esAdmin, async (req, res) => {
    try {
        const eliminados = await Actividad.destroy({
        where: { id: req.params.id }
        });
        if (!eliminados) return res.status(404).json({ mensaje: 'Actividad no encontrada' });

        res.json({ mensaje: 'Actividad eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    export default router;