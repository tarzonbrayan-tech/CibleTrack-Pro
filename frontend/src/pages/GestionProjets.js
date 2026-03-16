import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Folder } from 'lucide-react';

const GestionProjets = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <button className="btn btn-outline-secondary" onClick={() => navigate('/chef-dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="h2 mb-0">Gestion des Projets</h1>
      </div>

      <div className="card shadow-sm border-0 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="text-muted"><Folder size={20} className="me-2"/>Liste des enquêtes</h4>
          <button className="btn btn-primary d-flex align-items-center gap-2">
            <Plus size={18} /> Nouveau Projet
          </button>
        </div>

        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Nom du Projet</th>
              <th>Client</th>
              <th>Date Début</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Enquête Satisfaction SABC</td>
              <td>Brasseries du Cameroun</td>
              <td>12/03/2026</td>
              <td><span className="badge bg-success">En cours</span></td>
              <td><button className="btn btn-sm btn-outline-primary">Détails</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionProjets;