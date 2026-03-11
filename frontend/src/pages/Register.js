import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ nom: '', email: '', password: '', role: 'superviseur' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/register', formData);
            alert("Compte créé ! Connectez-vous.");
        } catch (err) {
            alert("Erreur lors de l'inscription");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-5">
            <h2>Créer un compte CIBLETRACK</h2>
            <input type="text" placeholder="Nom" onChange={(e) => setFormData({...formData, nom: e.target.value})} className="form-control mb-2" />
            <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} className="form-control mb-2" />
            <input type="password" placeholder="Mot de passe" onChange={(e) => setFormData({...formData, password: e.target.value})} className="form-control mb-2" />
            <select onChange={(e) => setFormData({...formData, role: e.target.value})} className="form-control mb-2">
                <option value="superviseur">Superviseur</option>
                <option value="chef">Chef de Projet</option>
            </select>
            <button type="submit" className="btn btn-primary">S'inscrire</button>
        </form>
    );
};

export default Register;