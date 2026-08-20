    import { Router } from 'express';
    import { Reserva, DetalleReserva, Carrito, ItemCarrito, Actividad } from '../models/index.js';
    import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

    const router = Router();

    // POST: Checkout (muda los ítems del carrito a una nueva Reserva)
    router.post('/checkout', verificarToken, async (req, res) => {
    try {
        const carrito = await Carrito.findOne({
        where: { usuario_id: req.usuario.id },
        include: [{ model: ItemCarrito, include: [Actividad] }]
        });

        if (!carrito || !carrito.ItemCarritos || carrito.ItemCarritos.length === 0) {
        return res.status(400).json({ mensaje: 'El carrito está vacío' });
        }

        // Calcular el monto total
        let total = 0;
        carrito.ItemCarritos.forEach(item => {
        total += Number(item.Actividad.precio) * item.cantidad;
        });

        // Crear la Reserva principal
        const nuevaReserva = await Reserva.create({
        usuario_id: req.usuario.id,
        total,
        estado: 'pendiente'
        });

        // Registrar el detalle freezing de precio
        const detalles = carrito.ItemCarritos.map(item => ({
        reserva_id: nuevaReserva.id,
        actividad_id: item.actividad_id,
        precio_unitario: item.Actividad.precio,
        cantidad: item.cantidad
        }));

        await DetalleReserva.bulkCreate(detalles);

        // Vaciar el carrito
        await ItemCarrito.destroy({ where: { carrito_id: carrito.id } });

        res.status(201).json({
        mensaje: 'Reserva generada con éxito',
        reservaId: nuevaReserva.id,
        total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    // GET: Mis reservas (Cliente autenticado)
    router.get('/mis-reservas', verificarToken, async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
        where: { usuario_id: req.usuario.id },
        include: [{ model: DetalleReserva, include: [Actividad] }]
        });
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    // GET: Todas las reservas (Solo Admin)
    router.get('/', verificarToken, esAdmin, async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
        include: [{ model: DetalleReserva, include: [Actividad] }]
        });
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    // PUT: Modificar estado de reserva (Solo Admin)
    router.put('/:id/estado', verificarToken, esAdmin, async (req, res) => {
    try {
        const { estado } = req.body;
        const reserva = await Reserva.findByPk(req.params.id);
        if (!reserva) return res.status(404).json({ mensaje: 'Reserva no encontrada' });

        reserva.estado = estado;
        await reserva.save();

        res.json({ mensaje: 'Estado de reserva actualizado', reserva });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    });

    export default router;