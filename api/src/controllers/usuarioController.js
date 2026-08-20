    import bcrypt from 'bcryptjs';
    import jwt from 'jsonwebtoken';
    import { Usuario } from '../models/index.js';

    // REGISTRO DE USUARIO
    export const registrarUsuario = async (req, res) => {
    try {
        const { nombre_usuario, email, password, nombre, apellido, telefono, rol } = req.body;

        // Verificar si el usuario o email ya existen
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
        return res.status(400).json({ mensaje: 'El email ya está registrado' });
        }

        // Encriptar la contraseña (hash)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Crear el nuevo usuario
        const nuevoUsuario = await Usuario.create({
        nombre_usuario,
        email,
        password: passwordHash,
        nombre,
        apellido,
        telefono,
        rol: rol || 'cliente' // Por defecto es cliente
        });

        res.status(201).json({
        mensaje: 'Usuario registrado exitosamente',
        usuario: {
            id: nuevoUsuario.id,
            nombre_usuario: nuevoUsuario.nombre_usuario,
            email: nuevoUsuario.email,
            rol: nuevoUsuario.rol
        }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    // LOGIN DE USUARIO
    export const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario por email
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Validar la contraseña
        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Generar el Token JWT
        const token = jwt.sign(
        { id: usuario.id, rol: usuario.rol },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '8h' }
        );

        res.json({
        mensaje: 'Inicio de sesión exitoso',
        token,
        usuario: {
            id: usuario.id,
            nombre_usuario: usuario.nombre_usuario,
            email: usuario.email,
            rol: usuario.rol
        }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };