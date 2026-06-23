import { Router } from 'express';

import { DetalleReserva } from '../models/index.js';

const router = Router();


// GET TODOS

router.get('/', async (req, res) => {

    const detallesReserva = await DetalleReserva.findAll();

    res.json(detallesReserva);

});


// GET POR ID

router.get('/:id', async (req, res) => {

    const detalleReserva = await DetalleReserva.findByPk(req.params.id);

    res.json(detalleReserva);

});


// POST

router.post('/', async (req, res) => {

    const nuevoDetalleReserva = await DetalleReserva.create(req.body);

    res.json(nuevoDetalleReserva);

});


// PUT

router.put('/:id', async (req, res) => {

    const detalleReserva = await DetalleReserva.findByPk(req.params.id);

    await detalleReserva.update(req.body);

    res.json(detalleReserva);

});


// DELETE

router.delete('/:id', async (req, res) => {

    await DetalleReserva.destroy({
        where: {
            detalle_reserva_id: req.params.id
        }
    });

    res.json({
        mensaje: 'Detalle de reserva eliminado'
    });

});

export default router;