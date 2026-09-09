import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ActividadDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [actividad, setActividad] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Estado para la fecha/salida seleccionada
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/actividades/${id}`)
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data[0] : res.data;
                setActividad(data);

                // Si la actividad trae un arreglo de fechas/salidas, preseleccionamos la primera
                const salidas = data.fechas || data.salidas || data.turnos || [];
                if (salidas.length > 0) {
                    setFechaSeleccionada(salidas[0]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al obtener detalle:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="container py-5 text-center fw-bold">Cargando experiencia...</div>;
    }

    if (!actividad) {
        return (
            <div className="container py-5 text-center">
                <h3>Actividad no encontrada</h3>
                <button onClick={() => navigate('/actividades')} className="btn btn-outline-dark mt-3 rounded-pill">
                    Volver a Actividades
                </button>
            </div>
        );
    }

    // Lista de fechas/salidas si existen en la respuesta del servidor
    const listaFechas = actividad.fechas || actividad.salidas || actividad.turnos || [];

    // Calculamos cupo disponible según si hay fecha seleccionada o si viene directo en la actividad
    const cupoDisponible = fechaSeleccionada 
        ? (fechaSeleccionada.cupo_disponible ?? fechaSeleccionada.cupo ?? 0)
        : (actividad.cupo_disponible ?? actividad.cupo ?? 0);

    const sinCupos = cupoDisponible <= 0;

    const handleReservar = () => {
        if (sinCupos) return;
        // Acá redirigís a tu checkout/reserva pasando la fecha seleccionada
        console.log("Reservando actividad:", actividad.id, "Fecha:", fechaSeleccionada);
        // navigate(`/reservar/${actividad.id}`, { state: { fecha: fechaSeleccionada } });
    };

    return (
        <div className="container py-5">
            {/* Botón Volver */}
            <button 
                onClick={() => navigate(-1)} 
                className="btn btn-outline-secondary rounded-pill px-4 mb-4 fw-bold shadow-sm"
                style={{ fontSize: '14px' }}
            >
                ❮ Volver
            </button>

            <div className="row g-5 align-items-center">
                {/* Imagen */}
                <div className="col-lg-6">
                    <img 
                        src={actividad.imagen || 'https://via.placeholder.com/600x400?text=Sin+Imagen'} 
                        alt={actividad.titulo} 
                        className="img-fluid rounded-4 shadow-sm w-100" 
                        style={{ maxHeight: '420px', objectFit: 'cover' }}
                    />
                </div>

                {/* Detalles y Formulario de Fecha */}
                <div className="col-lg-6">
                    <h1 className="fw-bold text-dark mb-1">{actividad.titulo}</h1>
                    <p className="text-muted fw-bold mb-3">📍 {actividad.ubicacion || 'Ubicación a coordinar'}</p>

                    <h2 className="text-success fw-bold fs-2 mb-3">
                        ${Number(actividad.precio).toLocaleString('es-AR')}
                    </h2>

                    <p className="text-secondary mb-4" style={{ lineHeight: '1.6' }}>
                        {actividad.descripcion || 'Recorrido guiado por el lago.'}
                    </p>

                    {/* SELECTOR DE FECHAS (si la API devuelve varias fechas) */}
                    {listaFechas.length > 0 ? (
                        <div className="mb-4">
                            <label className="form-label fw-bold text-dark">Seleccioná la fecha de salida:</label>
                            <select 
                                className="form-select form-select-lg rounded-3 shadow-sm border-1"
                                value={fechaSeleccionada ? (fechaSeleccionada.id || fechaSeleccionada.fecha) : ''}
                                onChange={(e) => {
                                    const seleccion = listaFechas.find(f => (f.id || f.fecha) == e.target.value);
                                    setFechaSeleccionada(seleccion);
                                }}
                            >
                                {listaFechas.map((f, idx) => (
                                    <option key={f.id || idx} value={f.id || f.fecha}>
                                        {f.fecha ? new Date(f.fecha).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : f.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        /* Si no hay array de fechas, muestra la fecha global de la actividad si existe */
                        actividad.fecha_inicio && (
                            <div className="p-3 bg-light rounded-3 mb-4 border">
                                <span className="fw-bold d-block text-dark">Fecha programada:</span>
                                <span className="text-muted">
                                    {new Date(actividad.fecha_inicio).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                </span>
                            </div>
                        )
                    )}

                    {/* INDICADOR DE CUPOS */}
                    <div className="d-flex align-items-center mb-4">
                        <span className={`badge px-3 py-2 rounded-pill fs-6 ${sinCupos ? 'bg-danger' : 'bg-dark'}`}>
                            {sinCupos ? 'AGOTADO' : `Cupos disponibles: ${cupoDisponible}`}
                        </span>
                    </div>

                    {/* BOTÓN RESERVAR */}
                    <button 
                        onClick={handleReservar}
                        disabled={sinCupos}
                        className={`btn btn-lg w-100 fw-bold rounded-pill shadow ${sinCupos ? 'btn-secondary' : ''}`}
                        style={{ 
                            backgroundColor: sinCupos ? '#6c757d' : '#198754', 
                            borderColor: '#198754',
                            color: '#FFFFFF',
                            padding: '14px'
                        }}
                    >
                        {sinCupos ? 'SIN LUGARES DISPONIBLES' : 'RESERVAR AHORA'}
                    </button>
                </div>
            </div>
        </div>
    );
};