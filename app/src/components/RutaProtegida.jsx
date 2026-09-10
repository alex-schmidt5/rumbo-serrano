import { Navigate } from 'react-router-dom';

export const RutaProtegida = ({ children, requiereAdmin = false, rolesPermitidos = [] }) => {
    const token = localStorage.getItem('token');
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    // 1. Si no hay token guardado, redirige a login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 2. Validación por lista de roles permitidos (ej: ['admin', 'operador'])
    if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(usuario.rol)) {
        return <Navigate to="/home" replace />;
    }

    // 3. Mantener compatibilidad con la propiedad previa 'requiereAdmin'
    if (requiereAdmin && usuario.rol !== 'admin') {
        return <Navigate to="/home" replace />;
    }

    return children;
};