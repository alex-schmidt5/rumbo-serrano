    import jwt from 'jsonwebtoken';

    // Verificar si el usuario envió un token válido
    export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado, token no proporcionado' });
    }

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        req.usuario = verificado; // Guardamos la info del token (id, rol) en la req
        next();
    } catch (error) {
        res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }
    };

    // Verificar si el usuario tiene rol 'admin'
    export const esAdmin = (req, res, next) => {
    if (req.usuario && req.usuario.rol === 'admin') {
        next();
    } else {
        res.status(403).json({ mensaje: 'Acceso restringido: requiere permisos de Administrador' });
    }
    };