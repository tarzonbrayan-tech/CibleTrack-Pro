import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importe l'outil de navigation
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate(); // Initialise le "navigateur"

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        email: email,
        password: password
      });

      if (response.data.status === "success") {
        // 1. On stocke les infos dans le navigateur (pour s'en souvenir)
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('userEmail', email);

        // 2. Redirection automatique selon le rôle reçu de Python
        if (response.data.role === 'chef') {
          navigate('/chef');
        } else if (response.data.role === 'superviseur') {
          navigate('/superviseur');
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Connexion</h2>
        {message && <div className="alert alert-danger">{message}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">se connecter</button>
          <p className="mt-3">
  Pas encore de compte ? <Link to="/register">Inscrivez-vous ici</Link>
</p>
        </form>
      </div>
    </div>
  );
}

export default Login;