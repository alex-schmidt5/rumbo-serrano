import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

    // Permitir acceso al panel a administradores y operadores
    const puedeAccederPanel = usuario && (usuario.rol === 'admin' || usuario.rol === 'operador');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg px-4 py-3" style={{ backgroundColor: '#F0EBE1', borderBottom: '1px solid #D6CEC2' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
            
            {/* Logo Branding leyendo directamente desde la carpeta /public */}
            <Link to="/home" className="navbar-brand d-flex align-items-center gap-2">
            <img 
                src="/logo.png" 
                alt="Logo Rumbo Serrano" 
                style={{ width: '40px', height: '40px', objectFit: 'contain' }} 
            />
            
            <div className="lh-1">
                <span className="fw-black text-uppercase d-block tracking-wider" style={{ color: '#3A3935', letterSpacing: '2px', fontWeight: '800' }}>
                RUMBO
                </span>
                <span className="fst-italic" style={{ color: '#635D55', fontFamily: 'serif', fontSize: '0.95rem' }}>
                Serrano
                </span>
            </div>
            </Link>

            {/* Links de Navegación */}
            <div className="d-none d-md-flex gap-4 fw-bold text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>
                <Link to="/home" className="text-decoration-none" style={{ color: '#4A463D' }}>INICIO</Link>
                <Link to="/actividades" className="text-decoration-none" style={{ color: '#4A463D' }}>ACTIVIDADES</Link>
                <Link to="/reservas" className="text-decoration-none" style={{ color: '#8A847A' }}>RESERVAS</Link>
            </div>

            {/* Sección de Usuario / Acceso */}
            <div className="d-flex align-items-center gap-3">
            <button className="btn btn-link text-dark p-0 me-2" title="Carrito">
                🛒
            </button>
            {usuario ? (
                <div className="d-flex align-items-center gap-2">
                <span className="badge px-3 py-2 text-dark rounded-pill" style={{ backgroundColor: '#E3DCCE', fontSize: '0.8rem' }}>
                    👤 {usuario.nombre_usuario}
                </span>
                {puedeAccederPanel && (
                    <Link to="/admin" className="btn btn-sm fw-bold px-3 py-1 rounded-pill" style={{ backgroundColor: '#72C253', color: '#FFF' }}>
                    PANEL
                    </Link>
                )}
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1" style={{ fontSize: '0.75rem' }}>
                    Salir
                </button>
                </div>
            ) : (
                <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-dark btn-sm fw-bold px-3 py-1 rounded-pill" style={{ fontSize: '0.8rem' }}>
                    INGRESAR
                </Link>
                <Link to="/registro" className="btn btn-sm fw-bold px-3 py-1 rounded-pill text-white" style={{ backgroundColor: '#72C253', fontSize: '0.8rem' }}>
                    REGISTRARSE
                </Link>
                </div>
            )}
            </div>

        </div>
        </nav>
    );
};