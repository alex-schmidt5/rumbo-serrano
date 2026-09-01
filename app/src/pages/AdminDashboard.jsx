    import { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import axios from 'axios';

    export const AdminDashboard = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const cargarUsuarios = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:3000/api/usuarios', {
            headers: { Authorization: `Bearer ${token}` }
            });
            setUsuarios(res.data);
        } catch (err) {
            console.error("Error al obtener usuarios:", err);
        }
        };
        cargarUsuarios();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        navigate('/login');
    };

    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: '#2B2B2B' }}>
        
        {/* Sidebar Lateral Estilo Rumbo Serrano */}
        <div className="p-4 d-flex flex-column justify-content-between" style={{ width: '280px', backgroundColor: '#F0EBE1', borderRight: '1px solid #D6CEC2' }}>
            <div>
            {/* Header Marca */}
            <div className="text-center mb-4">
                <span style={{ fontSize: '2.2rem' }}>🏔️</span>
                <h5 className="fw-black mb-0 tracking-wider" style={{ letterSpacing: '2px', color: '#3A3935' }}>RUMBO</h5>
                <p className="fst-italic small text-muted">Serrano</p>
            </div>

            <div className="p-2 mb-4 text-center rounded-pill fw-bold text-uppercase" style={{ backgroundColor: '#D1C7B7', color: '#555', fontSize: '0.8rem', letterSpacing: '1px' }}>
                PANEL ADMINISTRADOR
            </div>

            {/* Opciones de Navegación Lateral */}
            <div className="d-flex flex-column gap-3 text-uppercase fw-bold" style={{ fontSize: '0.82rem', color: '#4A463D' }}>
                <div className="d-flex justify-content-between align-items-center cursor-pointer">
                <span>AGENCIA</span> <span>❯</span>
                </div>
                <div className="d-flex justify-content-between align-items-center cursor-pointer">
                <span>CLIENTES</span> <span>❯</span>
                </div>
                <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>ACTIVIDADES</span> <span>❯</span>
                </div>
                <div className="ps-3 d-flex flex-column gap-2 text-muted" style={{ fontSize: '0.75rem' }}>
                    <div>• ADMINISTRAR ACTIVIDADES</div>
                    <div className="text-dark fw-bold">• NUEVA ACTIVIDAD</div>
                </div>
                </div>
                <div className="d-flex justify-content-between align-items-center cursor-pointer">
                <span>USUARIOS ({usuarios.length})</span> <span>❯</span>
                </div>
                <div className="d-flex justify-content-between align-items-center cursor-pointer">
                <span>ESTADÍSTICAS</span> <span>❯</span>
                </div>
                <div className="d-flex justify-content-between align-items-center cursor-pointer">
                <span>DESTINOS</span> <span>❯</span>
                </div>
                <div className="d-flex justify-content-between align-items-center cursor-pointer">
                <span>RESERVAS</span> <span>❯</span>
                </div>
            </div>
            </div>

            {/* Botón Cerrar Sesión Verde */}
            <button onClick={handleLogout} className="btn text-white fw-bold w-100 py-2 rounded-pill shadow-sm" style={{ backgroundColor: '#72C253', fontSize: '0.85rem' }}>
            CERRAR SESIÓN
            </button>
        </div>

        {/* Contenido Principal (Formulario Crear Actividad) */}
        <div className="flex-grow-1 p-5 d-flex justify-content-center align-items-center">
            <div className="p-4 shadow-lg" style={{ backgroundColor: '#F0EBE1', borderRadius: '25px', maxWidth: '800px', width: '100%' }}>
            
            <div className="row g-4">
                {/* Columna Izquierda Campos */}
                <div className="col-md-6">
                <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">NOMBRE *</label>
                    <input type="text" className="form-control rounded-3 border-secondary" placeholder="Ej: Trekking Champaquí" />
                </div>
                
                <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">DÍAS *</label>
                    <input type="text" className="form-control rounded-3 border-secondary" placeholder="Ej: 2 Días / 1 Noche" />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">DESTINO *</label>
                    <select className="form-select rounded-3 border-secondary">
                    <option>-- SELECCIONAR --</option>
                    <option>Villa General Belgrano</option>
                    <option>La Cumbrecita</option>
                    <option>Embalse</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">DESCRIPCIÓN</label>
                    <textarea className="form-control rounded-3 border-secondary" rows="3"></textarea>
                </div>

                <button className="btn text-white fw-bold px-4 py-2" style={{ backgroundColor: '#72C253', borderRadius: '12px' }}>
                    ACTUALIZAR
                </button>
                </div>

                {/* Columna Derecha Imagen */}
                <div className="col-md-6 text-center">
                <label className="form-label fw-bold small text-muted d-block text-uppercase">
                    SELECCIONA LA IMAGEN DE PORTADA, MÁXIMO 2MB (PESO DE IMAGEN)
                </label>

                <div className="d-flex align-items-center gap-2 mb-3">
                    <button className="btn text-white fw-bold btn-sm" style={{ backgroundColor: '#72C253', borderRadius: '15px' }}>
                    SELECCIONAR ARCHIVO
                    </button>
                    <span className="text-muted small">SIN ARCHIVOS SELECCIONADOS</span>
                </div>

                <button className="btn text-white fw-bold btn-sm mb-3 d-block" style={{ backgroundColor: '#72C253', borderRadius: '8px' }}>
                    SUBIR
                </button>

                <div className="border rounded-4 bg-white d-flex align-items-center justify-content-center text-muted" style={{ height: '180px' }}>
                    Vista previa de imagen
                </div>
                </div>
            </div>

            </div>
        </div>

        </div>
    );
    };