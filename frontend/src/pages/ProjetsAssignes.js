import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ClipboardList, Info, Calendar, Users, Target } from 'lucide-react';

const ProjetsAssignes = () => {
  const navigate = useNavigate();

  // Données de démonstration (Maquette)
  const [projets] = useState([
    { 
      id: 1, 
      nom: "Enquête Satisfaction SABC", 
      client: "Brasseries du Cameroun", 
      duree: "30 jours", 
      nbEnqueteurs: 5,
      statut: "En cours" 
    },
    { 
      id: 2, 
      nom: "Audit Qualité Orange", 
      client: "Orange CM", 
      duree: "15 jours", 
      nbEnqueteurs: 3,
      statut: "À venir" 
    }
  ]);

  return (
    <div className="container py-5">
      {/* En-tête */}
      <div className="d-flex align-items-center gap-3 mb-5">
        <button className="btn btn-outline-primary shadow-sm" onClick={() => navigate('/superviseur-dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="h2 mb-0">Mes Projets Assignés</h1>
          <p className="text-muted mb-0">Liste des missions sous votre supervision</p>
        </div>
      </div>

      <div className="row g-4">
        {projets.map((projet) => (
          <div className="col-md-6" key={projet.id}>
            <div className="card shadow-sm border-0 h-100 overflow-hidden">
              <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                <span className={`badge ${projet.statut === 'En cours' ? 'bg-success' : 'bg-secondary'}`}>
                  {projet.statut}
                </span>
                <span className="text-muted small fw-bold text-uppercase">{projet.client}</span>
              </div>
              
              <div className="card-body">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded text-primary">
                    <ClipboardList size={30} />
                  </div>
                  <h4 className="card-title mb-0 fw-bold">{projet.nom}</h4>
                </div>

                <div className="row mt-4 mb-4">
                  <div className="col-6">
                    <div className="d-flex align-items-center gap-2 text-muted mb-2">
                      <Calendar size={16} /> <small>Durée prévue</small>
                    </div>
                    <div className="fw-bold">{projet.duree}</div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center gap-2 text-muted mb-2">
                      <Users size={16} /> <small>Enquêteurs</small>
                    </div>
                    <div className="fw-bold">{projet.nbEnqueteurs} agents</div>
                  </div>
                </div>

                <button 
                  className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                  onClick={() => navigate('/details-projet')}
                >
                  <Info size={18} /> Détails du projet
                </button>
              </div>
            </div>
          </div>
        ))}

        {projets.length === 0 && (
          <div className="text-center py-5">
            <Target size={48} className="text-muted mb-3 opacity-20" />
            <p className="text-muted">Aucun projet ne vous est assigné pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjetsAssignes;