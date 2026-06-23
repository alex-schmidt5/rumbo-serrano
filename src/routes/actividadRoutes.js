import { Router } from 'express';

import { Actividad } from '../models/index.js';

const router = Router();


// GET TODOS

router.get('/', async (req, res) => {

    const actividades = await Actividad.findAll();

    res.json(actividades);

});


// GET POR ID

router.get('/:id', async (req, res) => {

    const actividad = await Actividad.findByPk(req.params.id);

    res.json(actividad);

});


// POST

router.post('/', async (req, res) => {

    const nuevaActividad = await Actividad.create(req.body);

    res.json(nuevaActividad);

});


// PUT

router.put('/:id', async (req, res) => {

    const actividad = await Actividad.findByPk(req.params.id);

    await actividad.update(req.body);

    res.json(actividad);

});


// DELETE

router.delete('/:id', async (req, res) => {

    await Actividad.destroy({
        where: {
            actividades_id: req.params.id
        }
    });

    res.json({
        mensaje: 'Actividad eliminada'
    });

});

export default router;