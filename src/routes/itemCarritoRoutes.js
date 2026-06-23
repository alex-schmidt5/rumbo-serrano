import { Router } from 'express';

import { ItemCarrito } from '../models/index.js';

const router = Router();


// GET TODOS

router.get('/', async (req, res) => {

    const itemsCarrito = await ItemCarrito.findAll();

    res.json(itemsCarrito);

});


// GET POR ID

router.get('/:id', async (req, res) => {

    const itemCarrito = await ItemCarrito.findByPk(req.params.id);

    res.json(itemCarrito);

});


// POST

router.post('/', async (req, res) => {

    const nuevoItemCarrito = await ItemCarrito.create(req.body);

    res.json(nuevoItemCarrito);

});


// PUT

router.put('/:id', async (req, res) => {

    const itemCarrito = await ItemCarrito.findByPk(req.params.id);

    await itemCarrito.update(req.body);

    res.json(itemCarrito);

});


// DELETE

router.delete('/:id', async (req, res) => {

    await ItemCarrito.destroy({
        where: {
            item_carrito_id: req.params.id
        }
    });

    res.json({
        mensaje: 'Item de carrito eliminado'
    });

});

export default router;