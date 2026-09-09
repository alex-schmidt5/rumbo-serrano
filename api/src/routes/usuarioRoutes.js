import { Router } from 'express';
import { 
    registrarUsuario, 
    loginUsuario, 
    obtenerUsuarios, 
    cambiarRol, 
    eliminarUsuario 
} from '../controllers/usuarioController.js';
import { Usuario } from '../models/index.js';
import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// --- RUTAS PÚBLICAS ---
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

// --- RUTAS PROTEGIDAS (Solo Administrador) ---

// GET TODOS LOS USUARIOS
router.get('/', verificarToken, esAdmin, obtenerUsuarios);

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

// PUT (Editar datos generales de un usuario)
router.put('/:id', verificarToken, async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        // Evita modificar directamente la contraseña desde esta ruta común
        delete req.body.password;

        await usuario.update(req.body);
        res.json({ mensaje: 'Usuario actualizado', usuario });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT (Cambiar ROL de usuario - Solo Administrador)
router.put('/:id/rol', verificarToken, esAdmin, cambiarRol);

// DELETE (Eliminar usuario - Solo Administrador)
router.delete('/:id', verificarToken, esAdmin, eliminarUsuario);

export default router;