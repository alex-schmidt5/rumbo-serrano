    import { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import axios from 'axios';

    export const Actividades = () => {
    const [actividades, setActividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        obtenerActividades();
    }, []);

    const obtenerActividades = async () => {
        try {
        const res = await axios.get('http://localhost:3000/api/actividades');
        setActividades(res.data);
        } catch (err) {
        console.error('Error al cargar actividades:', err);
        setError('No se pudieron cargar las actividades. Intenta nuevamente.');
        } finally {
        setLoading(false);
        }
    };

    if (loading) {
        return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#2B2B2B' }}>
            <div className="spinner-border text-light" role="status"></div>
        </div>
        );
    }

    return (
        <div className="py-5" style={{ backgroundColor: '#2B2B2B', minHeight: '100vh', color: '#F0EBE1' }}>
        <div className="container">
            
            {/* Encabezado */}
            <div className="text-center mb-5">
            <h2 className="fw-black text-uppercase tracking-wider display-5" style={{ letterSpacing: '2px' }}>
                ACTIVIDADES EN CALAMUCHITA
            </h2>
            <p className="lead text-muted" style={{ color: '#D6CEC2' }}>
                Descubrí la aventura que mejor se adapta a vos
            </p>
            </div>

            {error && (
            <div className="alert alert-danger text-center rounded-4 shadow" role="alert">
                {error}
            </div>
            )}

            {/* Grilla de Actividades */}
            <div className="row g-4">
            {actividades.length === 0 ? (
                <div className="col-12 text-center py-5">
                <p className="fs-5 text-muted">No hay actividades disponibles en este momento.</p>
                </div>
            ) : (
                actividades.map((act) => (
                <div key={act.id} className="col-12 col-md-6 col-lg-4">
                    <div 
                    className="card h-100 border-0 shadow-lg overflow-hidden transition-all"
                    style={{ backgroundColor: '#F0EBE1', borderRadius: '20px', color: '#3A3935' }}
                    >
                    {/* Contenedor de Imagen con Alto Fijo */}
                    <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                        <img 
                        src={act.imagen || 'https://via.placeholder.com/400x250?text=Sin+Imagen'} 
                        alt={act.titulo}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x250?text=Sin+Imagen'; }}
                        />
                        {act.duracion && (
                        <span 
                            className="badge position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill shadow-sm"
                            style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', color: '#FFF' }}
                        >
                            ⏱️ {act.duracion}
                        </span>
                        )}
                    </div>

                    {/* Cuerpo de la Card */}
                    <div className="card-body p-4 d-flex flex-column justify-content-between">
                        <div>
                        {act.ubicacion && (
                            <p className="small text-uppercase fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                            📍 {act.ubicacion}
                            </p>
                        )}
                        
                        <h4 className="fw-bold mb-2">{act.titulo}</h4>

                        {act.descripcion && (
                            <p className="small text-secondary mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {act.descripcion}
                            </p>
                        )}
                        </div>

                        {/* Precio y Botón de Detalle */}
                        <div className="pt-3 border-top d-flex justify-content-between align-items-center mt-3">
                        <div>
                            <span className="small text-muted d-block">Precio por persona</span>
                            <strong className="fs-4 text-success">${Number(act.precio).toLocaleString()}</strong>
                        </div>

                        <Link 
                            to={act.cupo_disponible <= 0 ? '#' : `/actividades/${act.id}`} 
                            className={`btn fw-bold px-3 py-2 rounded-pill shadow-sm text-white ${act.cupo_disponible <= 0 ? 'disabled opacity-50' : ''}`}
                            style={{ 
                                backgroundColor: act.cupo_disponible <= 0 ? '#6c757d' : '#72C253', 
                                textDecoration: 'none',
                                pointerEvents: act.cupo_disponible <= 0 ? 'none' : 'auto'
                            }}
                        >
                            {act.cupo_disponible <= 0 ? 'SIN LUGARES' : 'VER MÁS'}
                        </Link>
                        </div>

                    </div>
                    </div>
                </div>
                ))
            )}
            </div>

        </div>
        </div>
    );
    };