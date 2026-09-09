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
        <div 
        className="d-flex justify-content-center align-items-center min-vh-100 px-3 py-5" 
        style={{ 
            background: 'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80") center/cover no-repeat fixed'
        }}
        >
        <div 
            className="card p-4 shadow-lg border-0" 
            style={{ 
            maxWidth: '440px', 
            width: '100%', 
            borderRadius: '20px', 
            backgroundColor: 'rgba(240, 235, 225, 0.95)',
            backdropFilter: 'blur(5px)'
            }}
        >
            <div className="text-center mb-3">
            <img 
                src="/logo.png" 
                alt="Logo Rumbo Serrano" 
                className="mb-2"
                style={{ width: '60px', height: '60px', objectFit: 'contain' }} 
            />
            <h4 className="fw-black mb-0" style={{ letterSpacing: '2px', color: '#3A3935' }}>RUMBO SERRANO</h4>
            <p className="text-muted small mb-0">Crear una nueva cuenta</p>
            </div>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label small fw-bold text-muted">NOMBRE DE USUARIO *</label>
                <input
                type="text"
                name="nombre_usuario"
                className="form-control rounded-3 border-secondary"
                placeholder="Ej: alex123"
                value={formData.nombre_usuario}
                onChange={handleChange}
                required
                />
            </div>

            <div className="mb-3">
                <label className="form-label small fw-bold text-muted">EMAIL *</label>
                <input
                type="email"
                name="email"
                className="form-control rounded-3 border-secondary"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>

            <div className="mb-4">
                <label className="form-label small fw-bold text-muted">CONTRASEÑA *</label>
                <input
                type="password"
                name="password"
                className="form-control rounded-3 border-secondary"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </div>

            <button
                type="submit"
                className="btn text-white w-100 py-2 fw-bold shadow-sm"
                style={{ backgroundColor: '#72C253', borderRadius: '25px', letterSpacing: '1px' }}
            >
                REGISTRARSE
            </button>
            </form>

            <p className="text-center mt-4 mb-0 small text-muted">
            ¿Ya tenés cuenta? <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#FF8A00' }}>Iniciá sesión acá</Link>
            </p>
        </div>
        </div>
    );
    };