import { Router } from 'express';
import { Usuario } from '../models/index.js';

const router = Router();


// GET TODOS
router.get('/', async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});


// GET POR ID
router.get('/:id', async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    res.json(usuario);
});


// POST
router.post('/', async (req, res) => {
    const nuevoUsuario = await Usuario.create(req.body);
    res.json(nuevoUsuario);
});


// PUT
router.put('/:id', async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);

    await usuario.update(req.body);

    res.json(usuario);
});


// DELETE
router.delete('/:id', async (req, res) => {
    await Usuario.destroy({
        where: {
            usuario_id: req.params.id
        }
    });

    res.json({
        mensaje: 'Usuario eliminado'
    });
});

export default router;