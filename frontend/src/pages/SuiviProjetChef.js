import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, UserCheck, Star, Shield } from 'lucide-react';

const SuiviProjetChef = () => {
  const navigate = useNavigate();

  // Simulation des données hiérarchiques du projet
  const projetDetail = {
    nom: "Enquête Satisfaction SABC",
    superviseur: { id: 101, nom: "Alice Bella", email: "alice@cibletrack.com" },
    enqueteurs: [
      { id: 201, nom: "Paul Biya", statut: "Actif" },
      { id: 202, nom: "Marie Ngo", statut: "Actif" },
      { id: 203, nom: "Jean Marc", statut: "En pause" }
    ]
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <button className="btn btn-outline-secondary" onClick={() => navigate('/gestion-projets')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="h2 mb-0">Suivi du Projet : <span className="text-primary">{projetDetail.nom}</span></h1>
      </div>

      <div className="row g-4">
        {/* SECTION SUPERVISEUR ASSIGNÉ */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 border-top border-primary border-4 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2 mb-3 text-primary">
                <Shield size={24} />
                <h4 className="mb-0 fw-bold">Superviseur</h4>
              </div>
              <div className="p-3 bg-light rounded-3 mb-4">
                <div className="fw-bold fs-5">{projetDetail.superviseur.nom}</div>
                <div className="text-muted small">{projetDetail.superviseur.email}</div>
              </div>
              <button 
                className="btn btn-warning w-100 d-flex align-items-center justify-content-center gap-2 fw-bold"
                onClick={() => navigate('/evaluation-superviseur')}
              >
                <Star size={18} fill="white" /> Évaluer le Superviseur
              </button>
            </div>
          </div>
        </div>

        {/* SECTION ÉQUIPE D'ENQUÊTEURS (Affectés par le superviseur) */}
        <div className="col-md-8">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2 mb-4 text-success">
                <Users size={24} />
                <h4 className="mb-0 fw-bold">Équipe Terrain (Enquêteurs)</h4>
              </div>
              
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Nom de l'enquêteur</th>
                      <th>Statut</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projetDetail.enqueteurs.map(enq => (
                      <tr key={enq.id}>
                        <td className="fw-medium">{enq.nom}</td>
                        <td>
                          <span className={`badge rounded-pill ${enq.statut === 'Actif' ? 'bg-success' : 'bg-secondary'}`}>
                            {enq.statut}
                          </span>
                        </td>
                        <td className="text-center">
                          <button 
                            className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1 mx-auto"
                            onClick={() => navigate('/evaluation-enqueteur')}
                          >
                            <Star size={14} /> Évaluer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="small text-muted mt-3 italic">
                * Ces enquêteurs ont été affectés à ce projet par le superviseur <strong>{projetDetail.superviseur.nom}</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuiviProjetChef;