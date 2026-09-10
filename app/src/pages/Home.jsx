import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Home = () => {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const esAdmin = usuario.rol === 'admin';
    const [categorias, setCategorias] = useState([]);
    const [actividades, setActividades] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar categorías y actividades en paralelo
        Promise.all([
            axios.get('http://localhost:3000/api/categorias'),
            axios.get('http://localhost:3000/api/actividades')
        ])
        .then(([resCat, resAct]) => {
            setCategorias(resCat.data);
            setActividades(resAct.data);
        })
        .catch(err => console.error('Error al cargar datos en Home:', err));
    }, []);

    return (
        <div style={{ backgroundColor: '#FDFCF7', minHeight: '100vh' }}>

            {/* Saludo Personalizado Conservado */}
            <div className="container py-4">
                <div className="p-4 rounded-4 shadow-sm border d-flex justify-content-between align-items-center" style={{ backgroundColor: '#F0EBE1', borderColor: '#D6CEC2' }}>
                    <div>
                        <h4 className="fw-bold mb-1" style={{ color: '#3A3935' }}>
                            ¡Hola, {usuario.nombre_usuario || 'Viajero'}!
                        </h4>
                        <p className="mb-0 text-muted small">
                            ¿Listo para explorar la belleza de Calamuchita? Revisá nuestras próximas salidas serranas.
                        </p>
                    </div>
                    {esAdmin && (
                        <Link to="/admin" className="btn btn-sm fw-bold px-3 py-2 text-white shadow-sm" style={{ backgroundColor: '#72C253', borderRadius: '20px' }}>
                            ⚙️ IR AL PANEL DE ADMINISTRADOR
                        </Link>
                    )}
                </div>
            </div>

            {/* Hero Banner Estilo "Tu Próxima Aventura" */}
            <div className="position-relative text-center text-white py-5 px-3" style={{ background: 'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80") center/cover no-repeat', minHeight: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <h1 className="display-4 fw-extrabold text-uppercase mb-2" style={{ letterSpacing: '2px', textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
                        TU PRÓXIMA <span className="fst-italic fw-light" style={{ textTransform: 'none', fontFamily: 'serif' }}>Aventura</span>
                    </h1>
                    <h2 className="fw-black text-uppercase tracking-wider mb-3" style={{ letterSpacing: '3px', fontSize: '1.8rem' }}>
                        EN CALAMUCHITA
                    </h2>
                    <p className="lead mx-auto" style={{ maxWidth: '600px', fontSize: '0.95rem', opacity: '0.9' }}>
                        Explorá Calamuchita de una manera diferente: más naturaleza, más aventura, más recuerdos.
                    </p>
                </div>
            </div>

            {/* Sección de Categorías Dinámicas */}
            <div className="py-5" style={{ backgroundColor: '#483E33' }} id="actividades">
                <div className="container">
                    <div className="row g-4">
                        {categorias.length === 0 ? (
                            <div className="col-12 text-center text-white py-4">
                                <p>Cargando categorías...</p>
                            </div>
                        ) : (
                            categorias.map((cat) => {
                                // Soporte dinámico para Actividads (vía backend) o filtrado local manual
                                const listaActividades = (cat.Actividads || cat.actividades || []).length > 0 
                                    ? (cat.Actividads || cat.actividades)
                                    : actividades.filter(act => String(act.categoria_id) === String(cat.id));

                                // Fallback para imagen
                                const urlImagen = cat.imagen_url || cat.imagen || 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80';

                                return (
                                    <div key={cat.id} className="col-md-4">
                                        <div className="card h-100 border-0 shadow-lg" style={{ backgroundColor: '#FDFCF7', borderRadius: '12px', overflow: 'hidden' }}>
                                            <div style={{
                                                height: '180px',
                                                background: `linear-gradient(to top, rgba(0,0,0,0.7), transparent), url("${urlImagen}") center/cover`,
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                padding: '15px'
                                            }}>
                                                <h5 className="text-white fw-bold m-0" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                                                    {cat.nombre}
                                                </h5>
                                            </div>
                                            <div className="card-body p-4 d-flex flex-column justify-content-between">
                                                <ul className="list-unstyled text-muted small lh-lg mb-4">
                                                    {listaActividades.length > 0 ? (
                                                        listaActividades.slice(0, 4).map((act) => (
                                                            <li key={act.id} className="text-truncate">🌲 {act.titulo}</li>
                                                        ))
                                                    ) : (
                                                        <li className="fst-italic text-muted">Próximamente actividades...</li>
                                                    )}
                                                </ul>
                                                <button
                                                    onClick={() => navigate(`/actividades?categoria=${cat.id}`)}
                                                    className="btn text-white fw-bold w-100 py-2"
                                                    style={{ backgroundColor: '#FF8A00', borderRadius: '25px', letterSpacing: '1px' }}
                                                >
                                                    VER MÁS
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};