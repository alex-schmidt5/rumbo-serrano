import { Router } from 'express';

import { Categoria } from '../models/index.js';

const router = Router();


// GET TODOS

router.get('/', async (req, res) => {

    const categorias = await Categoria.findAll();

    res.json(categorias);

});


// GET POR ID

router.get('/:id', async (req, res) => {

    const categoria = await Categoria.findByPk(req.params.id);

    res.json(categoria);

});


// POST

router.post('/', async (req, res) => {

    const nuevaCategoria = await Categoria.create(req.body);

    res.json(nuevaCategoria);

});


// PUT

router.put('/:id', async (req, res) => {

    const categoria = await Categoria.findByPk(req.params.id);

    await categoria.update(req.body);

    res.json(categoria);

});


// DELETE

router.delete('/:id', async (req, res) => {

    await Categoria.destroy({
        where: {
            categoria_id: req.params.id
        }
    });

    res.json({
        mensaje: 'Categoría eliminada'
    });

});

export default router;