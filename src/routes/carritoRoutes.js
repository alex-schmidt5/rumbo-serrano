import { Router } from 'express';

import { Carrito } from '../models/index.js';

const router = Router();


// GET TODOS

router.get('/', async (req, res) => {

    const carritos = await Carrito.findAll();

    res.json(carritos);

});


// GET POR ID

router.get('/:id', async (req, res) => {

    const carrito = await Carrito.findByPk(req.params.id);

    res.json(carrito);

});


// POST

router.post('/', async (req, res) => {

    const nuevoCarrito = await Carrito.create(req.body);

    res.json(nuevoCarrito);

});


// PUT

router.put('/:id', async (req, res) => {

    const carrito = await Carrito.findByPk(req.params.id);

    await carrito.update(req.body);

    res.json(carrito);

});


// DELETE

router.delete('/:id', async (req, res) => {

    await Carrito.destroy({
        where: {
            carrito_id: req.params.id
        }
    });

    res.json({
        mensaje: 'Carrito eliminado'
    });

});

export default router;