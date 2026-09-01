    import { useState } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import axios from 'axios';

    export const Registro = () => {
    const [formData, setFormData] = useState({
        nombre_usuario: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
        // Enviamos nombre_usuario (y nombre por si acaso el controlador usa alguno de los dos)
        const dataToSend = {
            ...formData,
            nombre: formData.nombre_usuario
        };

        await axios.post('http://localhost:3000/api/usuarios/registro', dataToSend);

        alert('¡Usuario registrado con éxito!');
        navigate('/login');
        } catch (err) {
        setError(
            err.response?.data?.mensaje || 
            err.response?.data?.error || 
            'Ocurrió un error al intentar registrar el usuario'
        );
        }
    };

    return (
        <div className="container my-5 d-flex justify-content-center">
        <div className="card p-4 shadow-sm" style={{ maxWidth: '450px', width: '100%', borderRadius: '15px' }}>
            <p className="text-center text-primary text-uppercase fw-bold mb-1" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
            Crear cuenta
            </p>
            <h3 className="text-center fw-bold mb-2">Registro de Usuario</h3>
            <p className="text-center text-muted mb-4" style={{ fontSize: '0.9rem' }}>
            Completa tus datos para registrarte en la plataforma.
            </p>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label small fw-semibold">Nombre de Usuario *</label>
                <input
                type="text"
                name="nombre_usuario"
                className="form-control py-2"
                placeholder="Ej: alex123"
                value={formData.nombre_usuario}
                onChange={handleChange}
                required
                />
            </div>

            <div className="mb-3">
                <label className="form-label small fw-semibold">Email *</label>
                <input
                type="email"
                name="email"
                className="form-control py-2"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>

            <div className="mb-4">
                <label className="form-label small fw-semibold">Contraseña *</label>
                <input
                type="password"
                name="password"
                className="form-control py-2"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-semibold"
                style={{ borderRadius: '8px', backgroundColor: '#544af4' }}
            >
                Registrarse
            </button>
            </form>

            <p className="text-center mt-4 mb-0 small text-muted">
            ¿Ya tenés cuenta? <Link to="/login" className="text-primary text-decoration-none fw-semibold">Iniciá sesión acá</Link>
            </p>
        </div>
        </div>
    );
    };