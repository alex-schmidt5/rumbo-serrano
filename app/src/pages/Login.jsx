    import { useState } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import axios from 'axios';

    export const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
        const res = await axios.post('http://localhost:3000/api/usuarios/login', formData);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
        navigate('/home');
        } catch (err) {
        setError(err.response?.data?.mensaje || 'Error al iniciar sesión');
        }
    };

    return (
        <div 
        className="d-flex justify-content-center align-items-center min-vh-100 px-3" 
        style={{ 
            background: 'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80") center/cover no-repeat fixed'
        }}
        >
        <div 
            className="card p-4 shadow-lg border-0" 
            style={{ 
            maxWidth: '420px', 
            width: '100%', 
            borderRadius: '20px', 
            backgroundColor: 'rgba(240, 235, 225, 0.95)',
            backdropFilter: 'blur(5px)'
            }}
        >
            <div className="text-center mb-3">
            <span style={{ fontSize: '2.5rem' }}>🏔️</span>
            <h4 className="fw-black mb-0" style={{ letterSpacing: '2px', color: '#3A3935' }}>RUMBO SERRANO</h4>
            <p className="text-muted small mb-0">Iniciar Sesión</p>
            </div>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label small fw-bold text-muted">EMAIL *</label>
                <input 
                type="email" 
                name="email" 
                className="form-control rounded-3 border-secondary" 
                placeholder="tu@email.com"
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
                onChange={handleChange} 
                required 
                />
            </div>

            <button 
                type="submit" 
                className="btn text-white w-100 py-2 fw-bold shadow-sm" 
                style={{ backgroundColor: '#72C253', borderRadius: '25px', letterSpacing: '1px' }}
            >
                ENTRAR
            </button>
            </form>

            <p className="text-center mt-4 mb-0 small text-muted">
            ¿No tenés cuenta? <Link to="/registro" className="fw-bold text-decoration-none" style={{ color: '#FF8A00' }}>Registrate acá</Link>
            </p>
        </div>
        </div>
    );
    };