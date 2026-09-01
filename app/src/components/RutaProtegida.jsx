    import { Navigate } from 'react-router-dom';

    export const RutaProtegida = ({ children, requiereAdmin = false }) => {
    const token = localStorage.getItem('token');
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (requiereAdmin && usuario.rol !== 'admin') {
        return <Navigate to="/home" replace />;
    }

    return children;
    };