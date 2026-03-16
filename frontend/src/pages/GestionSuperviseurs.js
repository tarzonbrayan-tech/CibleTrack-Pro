import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus } from 'lucide-react';

const GestionSuperviseurs = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <button className="btn btn-outline-secondary" onClick={() => navigate('/chef-dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="h2 mb-0">Gestion des Superviseurs</h1>
      </div>

      <div className="card shadow-sm border-0 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Liste des collaborateurs</h4>
          <button className="btn btn-primary d-flex align-items-center gap-2">
            <UserPlus size={18} /> Ajouter un superviseur
          </button>
        </div>
        <p className="text-center text-muted my-5">Aucun superviseur créé pour le moment.</p>
      </div>
    </div>
  );
};

export default GestionSuperviseurs;