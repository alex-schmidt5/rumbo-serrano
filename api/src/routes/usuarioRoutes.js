    import { Router } from 'express';
    import { Usuario } from '../models/index.js';
    import { registrarUsuario, loginUsuario } from '../controllers/usuarioController.js';
    import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

    const router = Router();

    // --- RUTAS PÚBLICAS ---
    router.post('/registro', registrarUsuario);
    router.post('/login', loginUsuario);

    // --- RUTAS PROTEGIDAS (Solo Administrador) ---

    // GET TODOS LOS USUARIOS
    router.get('/', verificarToken, esAdmin, async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
        attributes: { exclude: ['password'] } // No devuelve la contraseña
        });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    // GET POR ID
    router.get('/:id', verificarToken, async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
        });
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    // PUT (Editar datos de un usuario)
    router.put('/:id', verificarToken, async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        // Evita modificar directamente el password desde esta ruta común
        delete req.body.password;

        await usuario.update(req.body);
        res.json({ mensaje: 'Usuario actualizado', usuario });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    });

    // DELETE (Eliminar usuario - Corregido a 'id')
    router.delete('/:id', verificarToken, esAdmin, async (req, res) => {
    try {
        const eliminados = await Usuario.destroy({
        where: { id: req.params.id }
        });
        if (!eliminados) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    export default router;