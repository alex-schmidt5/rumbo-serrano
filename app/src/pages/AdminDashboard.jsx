import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AdminDashboard = () => {
    const navigate = useNavigate();

    const [seccionActual, setSeccionActual] = useState('actividades');

    const [actividades, setActividades] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    const [modoEdicion, setModoEdicion] = useState(false);
    const [actividadIdEdit, setActividadIdEdit] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    const [formData, setFormData] = useState({
        titulo: '',
        duracion: '',
        ubicacion: '',
        precio: '',
        imagen: '',
        descripcion: '',
        categoria_id: 1,
        fecha_inicio: '',
        fecha_fin: '',
        cupo_maximo: 10,
        cupo_disponible: 10
    });

    const token = localStorage.getItem('token');
    const configAuth = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        cargarActividades();
        cargarUsuarios();
    }, []);

    const cargarActividades = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:3000/api/actividades');
            setActividades(res.data);
        } catch (err) {
            console.error("Error al obtener actividades:", err);
        } finally {
            setLoading(false);
        }
    };

    const cargarUsuarios = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/usuarios', configAuth);
            setUsuarios(res.data);
        } catch (err) {
            console.error("Error al obtener usuarios:", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        navigate('/login');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const abrirModalCrear = () => {
        setModoEdicion(false);
        setActividadIdEdit(null);
        setFormData({
            titulo: '',
            duracion: '',
            ubicacion: '',
            precio: '',
            imagen: '',
            descripcion: '',
            categoria_id: 1,
            fecha_inicio: '',
            fecha_fin: '',
            cupo_maximo: 10,
            cupo_disponible: 10
        });
        setMostrarModal(true);
    };

    const abrirModalEditar = (act) => {
        setModoEdicion(true);
        setActividadIdEdit(act.id);
        setFormData({
            titulo: act.titulo || '',
            duracion: act.duracion || '',
            ubicacion: act.ubicacion || '',
            precio: act.precio || '',
            imagen: act.imagen || '',
            descripcion: act.descripcion || '',
            categoria_id: act.categoria_id || 1,
            fecha_inicio: act.fecha_inicio ? new Date(act.fecha_inicio).toISOString().slice(0, 16) : '',
            fecha_fin: act.fecha_fin ? new Date(act.fecha_fin).toISOString().slice(0, 16) : '',
            cupo_maximo: act.cupo_maximo ?? 10,
            cupo_disponible: act.cupo_disponible ?? 10
        });
        setMostrarModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (modoEdicion) {
                await axios.put(`http://localhost:3000/api/actividades/${actividadIdEdit}`, formData, configAuth);
                setMensaje({ tipo: 'success', texto: '¡Actividad actualizada correctamente!' });
            } else {
                await axios.post('http://localhost:3000/api/actividades', formData, configAuth);
                setMensaje({ tipo: 'success', texto: '¡Actividad creada con éxito!' });
            }
            setMostrarModal(false);
            cargarActividades();
        } catch (err) {
            setMensaje({ 
                tipo: 'danger', 
                texto: err.response?.data?.error || err.response?.data?.mensaje || 'Error al procesar la solicitud' 
            });
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Deseas eliminar esta actividad?')) {
            try {
                await axios.delete(`http://localhost:3000/api/actividades/${id}`, configAuth);
                setMensaje({ tipo: 'warning', texto: 'Actividad eliminada.' });
                cargarActividades();
            } catch (err) {
                setMensaje({ tipo: 'danger', texto: 'Error al eliminar la actividad.' });
            }
        }
    };

    const cambiarRolUsuario = async (id, nuevoRol) => {
        if (nuevoRol === 'cliente') {
            const cantidadAdmins = usuarios.filter(u => u.rol === 'admin').length;
            if (cantidadAdmins <= 1) {
                setMensaje({ 
                    tipo: 'danger', 
                    texto: 'Acción denegada: Debe haber al menos un administrador en el sistema.' 
                });
                return;
            }
        }

        try {
            await axios.put(`http://localhost:3000/api/usuarios/${id}/rol`, { rol: nuevoRol }, configAuth);
            setMensaje({ tipo: 'success', texto: '¡Rol de usuario actualizado correctamente!' });
            cargarUsuarios();
        } catch (err) {
            setMensaje({ 
                tipo: 'danger', 
                texto: err.response?.data?.error || 'Error al cambiar el rol del usuario.' 
            });
        }
    };

    const handleEliminarUsuario = async (usr) => {
        if (usr.rol === 'admin') {
            const cantidadAdmins = usuarios.filter(u => u.rol === 'admin').length;
            if (cantidadAdmins <= 1) {
                setMensaje({ 
                    tipo: 'danger', 
                    texto: 'Acción denegada: No se puede eliminar al único administrador del sistema.' 
                });
                return;
            }
        }

        if (window.confirm(`¿Deseas eliminar al usuario "${usr.nombre || usr.nombre_usuario || usr.email}"?`)) {
            try {
                await axios.delete(`http://localhost:3000/api/usuarios/${usr.id}`, configAuth);
                setMensaje({ tipo: 'warning', texto: 'Usuario eliminado.' });
                cargarUsuarios();
            } catch (err) {
                setMensaje({ tipo: 'danger', texto: 'Error al eliminar el usuario.' });
            }
        }
    };

    // Formateador dinámico para mostrar rangos de fecha de manera limpia
    const formatearFechas = (inicio, fin) => {
        if (!inicio) return 'A convenir';
        const dInicio = new Date(inicio).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
        if (!fin) return dInicio;
        const dFin = new Date(fin).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
        return `${dInicio} HS ➔ ${dFin} HS`;
    };

    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: '#2B2B2B' }}>
        
        {/* Sidebar Lateral */}
        <div className="p-4 d-flex flex-column justify-content-between" style={{ width: '280px', backgroundColor: '#F0EBE1', borderRight: '1px solid #D6CEC2' }}>
            <div>
            <div className="text-center mb-4 cursor-pointer" onClick={() => setSeccionActual('inicio')}>
                <img src="/logo.png" alt="Logo" style={{ width: '50px', height: '50px', objectFit: 'contain' }} className="mb-2" />
                <h5 className="fw-black mb-0 tracking-wider" style={{ letterSpacing: '2px', color: '#3A3935' }}>RUMBO</h5>
                <p className="fst-italic small text-muted mb-0">Serrano</p>
            </div>

            <div className="p-2 mb-4 text-center rounded-pill fw-bold text-uppercase" style={{ backgroundColor: '#D1C7B7', color: '#555', fontSize: '0.78rem', letterSpacing: '1px' }}>
                PANEL ADMINISTRADOR
            </div>

            <div className="d-flex flex-column gap-2 text-uppercase fw-bold" style={{ fontSize: '0.82rem', color: '#4A463D' }}>
                <button 
                onClick={() => setSeccionActual('inicio')}
                className={`btn text-start text-uppercase fw-bold border-0 p-2 d-flex justify-content-between align-items-center ${seccionActual === 'inicio' ? 'bg-white shadow-sm rounded-3' : ''}`}
                style={{ color: '#4A463D', fontSize: '0.82rem' }}
                >
                <span>INICIO / ESTADÍSTICAS</span> <span>❯</span>
                </button>

                <button 
                onClick={() => setSeccionActual('actividades')}
                className={`btn text-start text-uppercase fw-bold border-0 p-2 d-flex justify-content-between align-items-center ${seccionActual === 'actividades' ? 'bg-white shadow-sm rounded-3' : ''}`}
                style={{ color: '#4A463D', fontSize: '0.82rem' }}
                >
                <span>ACTIVIDADES ({actividades.length})</span> <span>❯</span>
                </button>

                <button 
                onClick={() => setSeccionActual('destinos')}
                className={`btn text-start text-uppercase fw-bold border-0 p-2 d-flex justify-content-between align-items-center ${seccionActual === 'destinos' ? 'bg-white shadow-sm rounded-3' : ''}`}
                style={{ color: '#4A463D', fontSize: '0.82rem' }}
                >
                <span>DESTINOS</span> <span>❯</span>
                </button>

                <button 
                onClick={() => setSeccionActual('categorias')}
                className={`btn text-start text-uppercase fw-bold border-0 p-2 d-flex justify-content-between align-items-center ${seccionActual === 'categorias' ? 'bg-white shadow-sm rounded-3' : ''}`}
                style={{ color: '#4A463D', fontSize: '0.82rem' }}
                >
                <span>CATEGORÍAS</span> <span>❯</span>
                </button>

                <button 
                onClick={() => setSeccionActual('usuarios')}
                className={`btn text-start text-uppercase fw-bold border-0 p-2 d-flex justify-content-between align-items-center ${seccionActual === 'usuarios' ? 'bg-white shadow-sm rounded-3' : ''}`}
                style={{ color: '#4A463D', fontSize: '0.82rem' }}
                >
                <span>USUARIOS ({usuarios.length})</span> <span>❯</span>
                </button>
            </div>
            </div>

            <button onClick={handleLogout} className="btn text-white fw-bold w-100 py-2 rounded-pill shadow-sm" style={{ backgroundColor: '#72C253', fontSize: '0.85rem' }}>
            CERRAR SESIÓN
            </button>
        </div>

        {/* ÁREA PRINCIPAL */}
        <div className="flex-grow-1 p-4 p-md-5 overflow-auto" style={{ maxHeight: '100vh' }}>
            
            {mensaje.texto && (
            <div className={`alert alert-${mensaje.tipo} alert-dismissible fade show mb-4`} role="alert">
                {mensaje.texto}
                <button type="button" className="btn-close" onClick={() => setMensaje({ tipo: '', texto: '' })}></button>
            </div>
            )}

            {/* SECCIÓN ACTIVIDADES */}
            {seccionActual === 'actividades' && (
            <div className="p-4 shadow-lg" style={{ backgroundColor: '#F0EBE1', borderRadius: '25px' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="fw-bold mb-0" style={{ color: '#3A3935' }}>Gestión de Actividades</h3>
                    <p className="text-muted small mb-0">Administrá las experiencias, itinerarios y cupos disponibles</p>
                </div>

                <button 
                    onClick={abrirModalCrear}
                    className="btn text-white fw-bold d-flex align-items-center gap-2 shadow-sm px-3 py-2"
                    style={{ backgroundColor: '#72C253', borderRadius: '15px' }}
                >
                    <span style={{ fontSize: '1.2rem', lineHeight: '0' }}>+</span> NUEVA ACTIVIDAD
                </button>
                </div>

                {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-success" role="status"></div>
                    <p className="mt-2 text-muted">Cargando...</p>
                </div>
                ) : (
                <div className="table-responsive rounded-4 bg-white p-3 shadow-sm">
                    <table className="table table-hover align-middle mb-0">
                    <thead className="table-light text-uppercase small">
                        <tr>
                        <th>Imagen</th>
                        <th>Título</th>
                        <th>Fechas de Salida / Regreso</th>
                        <th>Cupos</th>
                        <th>Precio</th>
                        <th className="text-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actividades.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-muted">
                            No hay actividades registradas.
                            </td>
                        </tr>
                        ) : (
                        actividades.map((act) => (
                            <tr key={act.id}>
                            <td>
                                <img 
                                src={act.imagen || '/logo.png'} 
                                alt={act.titulo} 
                                className="rounded-3" 
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                />
                            </td>
                            <td className="fw-bold" style={{ color: '#3A3935' }}>{act.titulo}</td>
                            <td className="small text-muted fw-semibold">
                                {formatearFechas(act.fecha_inicio, act.fecha_fin)}
                            </td>
                            <td>
                                <span className={`badge rounded-pill ${act.cupo_disponible > 0 ? 'bg-success' : 'bg-danger'}`}>
                                    {act.cupo_disponible} / {act.cupo_maximo} libres
                                </span>
                            </td>
                            <td className="fw-bold text-success">${Number(act.precio).toLocaleString()}</td>
                            <td className="text-end">
                                <button 
                                onClick={() => abrirModalEditar(act)}
                                className="btn btn-sm btn-outline-dark me-2 rounded-pill px-3"
                                >
                                Editar
                                </button>
                                <button 
                                onClick={() => handleEliminar(act.id)}
                                className="btn btn-sm btn-outline-danger rounded-pill px-3"
                                >
                                Borrar
                                </button>
                            </td>
                            </tr>
                        ))
                        )}
                    </tbody>
                    </table>
                </div>
                )}
            </div>
            )}

            {/* SECCIÓN USUARIOS */}
            {seccionActual === 'usuarios' && (
            <div className="p-4 shadow-lg" style={{ backgroundColor: '#F0EBE1', borderRadius: '25px' }}>
                <div className="mb-4">
                <h3 className="fw-bold mb-0" style={{ color: '#3A3935' }}>Gestión de Usuarios y Roles</h3>
                <p className="text-muted small mb-0">Administrá el acceso y los permisos de administradores</p>
                </div>

                <div className="table-responsive rounded-4 bg-white p-3 shadow-sm">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light text-uppercase small">
                    <tr>
                        <th>ID</th>
                        <th>Nombre / Email</th>
                        <th>Rol Actual</th>
                        <th className="text-end">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usuarios.length === 0 ? (
                        <tr>
                        <td colSpan="4" className="text-center py-4 text-muted">
                            No hay usuarios registrados.
                        </td>
                        </tr>
                    ) : (
                        usuarios.map((usr) => {
                        const esAdmin = usr.rol === 'admin';

                        return (
                            <tr key={usr.id}>
                            <td className="fw-bold text-muted">#{usr.id}</td>
                            <td>
                                <div className="fw-bold" style={{ color: '#3A3935' }}>
                                    {usr.nombre ? `${usr.nombre} ${usr.apellido || ''}` : usr.nombre_usuario}
                                </div>
                                <div className="small text-muted">{usr.email}</div>
                            </td>
                            <td>
                                <span className={`badge rounded-pill px-3 py-2 ${esAdmin ? 'bg-success text-white' : 'bg-secondary text-white'}`}>
                                {esAdmin ? 'ADMINISTRADOR' : 'CLIENTE'}
                                </span>
                            </td>
                            <td className="text-end">
                                <button 
                                onClick={() => cambiarRolUsuario(usr.id, esAdmin ? 'cliente' : 'admin')}
                                className="btn btn-sm btn-outline-dark rounded-pill px-3 me-2"
                                >
                                {esAdmin ? 'Quitar Admin' : 'Hacer Admin'}
                                </button>
                                <button 
                                onClick={() => handleEliminarUsuario(usr)}
                                className="btn btn-sm btn-outline-danger rounded-pill px-3"
                                >
                                Borrar
                                </button>
                            </td>
                            </tr>
                        );
                        })
                    )}
                    </tbody>
                </table>
                </div>
            </div>
            )}

            {seccionActual === 'inicio' && (
            <div className="p-4 shadow-lg text-center" style={{ backgroundColor: '#F0EBE1', borderRadius: '25px' }}>
                <h3 className="fw-bold">Panel Principal & Estadísticas</h3>
                <p className="text-muted">Próximamente: Resumen de ventas, reservas e ingresos.</p>
            </div>
            )}

            {seccionActual === 'destinos' && (
            <div className="p-4 shadow-lg text-center" style={{ backgroundColor: '#F0EBE1', borderRadius: '25px' }}>
                <h3 className="fw-bold">Gestión de Destinos</h3>
                <p className="text-muted">Próximamente: Control de lugares geográficos.</p>
            </div>
            )}

            {seccionActual === 'categorias' && (
            <div className="p-4 shadow-lg text-center" style={{ backgroundColor: '#F0EBE1', borderRadius: '25px' }}>
                <h3 className="fw-bold">Gestión de Categorías</h3>
                <p className="text-muted">Próximamente: Control de categorías del sitio.</p>
            </div>
            )}

        </div>

        {/* MODAL CREAR / EDITAR ACTIVIDAD */}
        {mostrarModal && (
            <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg" style={{ backgroundColor: '#F0EBE1', borderRadius: '20px' }}>
                
                <div className="modal-header border-0 pb-0">
                    <h5 className="modal-title fw-bold" style={{ color: '#3A3935' }}>
                    {modoEdicion ? 'Editar Actividad' : 'Nueva Actividad'}
                    </h5>
                    <button type="button" className="btn-close" onClick={() => setMostrarModal(false)}></button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body p-4">
                    <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label fw-bold small text-muted">TÍTULO *</label>
                        <input 
                        type="text" 
                        name="titulo" 
                        className="form-control rounded-3 border-secondary" 
                        placeholder="Ej: Trekking Champaquí" 
                        value={formData.titulo} 
                        onChange={handleChange} 
                        required 
                        />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label fw-bold small text-muted">PRECIO ($) *</label>
                        <input 
                        type="number" 
                        step="0.01" 
                        name="precio" 
                        className="form-control rounded-3 border-secondary" 
                        placeholder="Ej: 25000" 
                        value={formData.precio} 
                        onChange={handleChange} 
                        required 
                        />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label fw-bold small text-muted">DURACIÓN</label>
                        <input 
                        type="text" 
                        name="duracion" 
                        className="form-control rounded-3 border-secondary" 
                        placeholder="Ej: 2 Días / 1 Noche" 
                        value={formData.duracion} 
                        onChange={handleChange} 
                        />
                    </div>

                    {/* RANGO DE FECHAS */}
                    <div className="col-md-6">
                        <label className="form-label fw-bold small text-muted">FECHA Y HORA DE INICIO / SALIDA</label>
                        <input 
                        type="datetime-local" 
                        name="fecha_inicio" 
                        className="form-control rounded-3 border-secondary" 
                        value={formData.fecha_inicio} 
                        onChange={handleChange} 
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-bold small text-muted">FECHA Y HORA DE REGRESO</label>
                        <input 
                        type="datetime-local" 
                        name="fecha_fin" 
                        className="form-control rounded-3 border-secondary" 
                        value={formData.fecha_fin} 
                        onChange={handleChange} 
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label fw-bold small text-muted">CUPO MÁXIMO</label>
                        <input 
                        type="number" 
                        name="cupo_maximo" 
                        className="form-control rounded-3 border-secondary" 
                        min="1"
                        value={formData.cupo_maximo} 
                        onChange={handleChange} 
                        required 
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label fw-bold small text-muted">CUPOS DISPONIBLES</label>
                        <input 
                        type="number" 
                        name="cupo_disponible" 
                        className="form-control rounded-3 border-secondary" 
                        min="0"
                        max={formData.cupo_maximo}
                        value={formData.cupo_disponible} 
                        onChange={handleChange} 
                        required 
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label fw-bold small text-muted">UBICACIÓN</label>
                        <input 
                        type="text" 
                        name="ubicacion" 
                        className="form-control rounded-3 border-secondary" 
                        placeholder="Ej: La Cumbrecita" 
                        value={formData.ubicacion} 
                        onChange={handleChange} 
                        />
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-bold small text-muted">URL DE LA IMAGEN</label>
                        <input 
                        type="url" 
                        name="imagen" 
                        className="form-control rounded-3 border-secondary" 
                        placeholder="https://images.unsplash.com/foto.jpg" 
                        value={formData.imagen} 
                        onChange={handleChange} 
                        />
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-bold small text-muted">DESCRIPCIÓN</label>
                        <textarea 
                        name="descripcion" 
                        className="form-control rounded-3 border-secondary" 
                        rows="3" 
                        placeholder="Detalles sobre el recorrido..." 
                        value={formData.descripcion} 
                        onChange={handleChange}
                        ></textarea>
                    </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                    <button 
                        type="button" 
                        className="btn btn-secondary rounded-pill px-4" 
                        onClick={() => setMostrarModal(false)}
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        className="btn text-white fw-bold rounded-pill px-4" 
                        style={{ backgroundColor: '#72C253' }}
                    >
                        {modoEdicion ? 'ACTUALIZAR' : 'GUARDAR'}
                    </button>
                    </div>
                </form>

                </div>
            </div>
            </div>
        )}

        </div>
    );
};