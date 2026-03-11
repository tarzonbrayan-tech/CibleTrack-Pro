import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Import des icônes
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ nom: '', email: '', password: '', role: 'superviseur' });
    
    // ÉTAT POUR VISIBILITÉ DU MOT DE PASSE
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/register', formData);
            alert("Compte créé !");
        } catch (err) {
            alert("Erreur 400 : Vérifiez vos données ou l'email");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <h2 className="text-center mb-4">Créer un compte</h2>
                
                {/* Champ Nom */}
                <input type="text" placeholder="Nom complet" className="form-control mb-3" 
                    onChange={(e) => setFormData({...formData, nom: e.target.value})} />

                {/* Champ Email */}
                <input type="email" placeholder="Email" className="form-control mb-3" 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} />

                {/* Champ MOT DE PASSE AVEC ŒIL */}
                <div className="position-relative mb-3">
                    <input 
                        type={showPassword ? "text" : "password"} // Bascule entre text et password
                        placeholder="Mot de passe" 
                        className="form-control"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <div 
                        onClick={togglePasswordVisibility}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            color: '#6c757d'
                        }}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                </div>

                {/* Champ Rôle */}
                <select className="form-select mb-4" onChange={(e) => setFormData({...formData, role: e.target.value})}>
                    <option value="superviseur">Superviseur</option>
                    <option value="chef">Chef de Projet</option>
                </select>

                <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
            </form>
        </div>
    );
};

export default Register;