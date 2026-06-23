import { Router } from 'express';

import { Reserva } from '../models/index.js';

const router = Router();


// GET TODOS

router.get('/', async (req, res) => {

    const reservas = await Reserva.findAll();

    res.json(reservas);

});


// GET POR ID

router.get('/:id', async (req, res) => {

    const reserva = await Reserva.findByPk(req.params.id);

    res.json(reserva);

});


// POST

router.post('/', async (req, res) => {

    const nuevaReserva = await Reserva.create(req.body);

    res.json(nuevaReserva);

});


// PUT

router.put('/:id', async (req, res) => {

    const reserva = await Reserva.findByPk(req.params.id);

    await reserva.update(req.body);

    res.json(reserva);

});


// DELETE

router.delete('/:id', async (req, res) => {

    await Reserva.destroy({
        where: {
            reserva_id: req.params.id
        }
    });

    res.json({
        mensaje: 'Reserva eliminada'
    });

});

export default router;