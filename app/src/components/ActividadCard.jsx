export const ActividadCard = ({ actividad, onReservar }) => {
    const sinCupos = actividad.cupo_disponible <= 0;

    const formatearFechas = (inicio, fin) => {
        if (!inicio) return null;
        
        const fechaInicio = new Date(inicio);
        const opcionesDia = { weekday: 'short', day: 'numeric', month: 'short' };
        
        if (!fin) {
            return `📅 Salida: ${fechaInicio.toLocaleDateString('es-AR', opcionesDia)} - ${fechaInicio.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} hs`;
        }

        const fechaFin = new Date(fin);
        
        // Si es el mismo día
        if (fechaInicio.toDateString() === fechaFin.toDateString()) {
            return `📅 ${fechaInicio.toLocaleDateString('es-AR', opcionesDia)} (${fechaInicio.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} a ${fechaFin.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} hs)`;
        }

        // Si son días distintos (varias noches/días)
        return `📅 Del ${fechaInicio.toLocaleDateString('es-AR', opcionesDia)} al ${fechaFin.toLocaleDateString('es-AR', opcionesDia)}`;
    };

    return (
        <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
            <div className="position-relative">
                <img 
                    src={actividad.imagen || '/placeholder.jpg'} 
                    className="card-img-top" 
                    alt={actividad.titulo} 
                    style={{ height: '200px', objectFit: 'cover' }} 
                />
                
                {/* Badge de Duración */}
                {actividad.duracion && (
                    <span className="position-absolute top-0 start-0 m-3 badge bg-light text-dark shadow-sm rounded-pill fw-bold">
                        ⏳ {actividad.duracion}
                    </span>
                )}

                {/* Badge de Cupos */}
                <span className={`position-absolute top-0 end-0 m-3 badge rounded-pill ${sinCupos ? 'bg-danger' : 'bg-dark'}`}>
                    {sinCupos ? 'AGOTADO' : `${actividad.cupo_disponible} lugares disponibles`}
                </span>
            </div>

            <div className="card-body d-flex flex-column justify-content-between p-4">
                <div>
                    <h5 className="card-title fw-bold text-dark mb-1">{actividad.titulo}</h5>
                    <p className="card-text text-muted small mb-2">
                        📍 {actividad.ubicacion || 'Ubicación a coordinar'}
                    </p>
                    
                    {/* Rango de Fechas */}
                    {actividad.fecha_inicio && (
                        <p className="card-text small text-secondary fw-bold mb-3">
                            {formatearFechas(actividad.fecha_inicio, actividad.fecha_fin)}
                        </p>
                    )}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                    <div>
                        <span className="small text-muted d-block">Precio por persona</span>
                        <span className="fs-5 fw-bold text-success">${Number(actividad.precio).toLocaleString()}</span>
                    </div>

                    <button 
                        onClick={() => onReservar && onReservar(actividad.id)} 
                        disabled={sinCupos}
                        className={`btn rounded-pill px-4 fw-bold ${sinCupos ? 'btn-secondary' : 'btn-success'}`}
                    >
                        {sinCupos ? 'Sin Lugares' : 'Reservar'}
                    </button>
                </div>
            </div>
        </div>
    );
};