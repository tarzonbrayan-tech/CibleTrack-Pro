import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Clock, Users, CheckCircle2 } from 'lucide-react';

const DetailsProjet = () => {
  const navigate = useNavigate();

  // Données de simulation pour la fiche détail
  const projet = {
    nom: "Enquête Satisfaction SABC",
    objectif: "Évaluer le niveau de satisfaction des consommateurs concernant la nouvelle gamme de boissons gazeuses sur le marché de Douala et Yaoundé.",
    duree: "Du 15 Mars au 15 Avril 2026",
    enqueteurs: [
      { id: 1, nom: "Paul Biya", role: "Agent Terrain" },
      { id: 2, nom: "Marie Ngo", role: "Agent Terrain" },
      { id: 3, nom: "Jean Marc", role: "Vérificateur" }
    ]
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <button className="btn btn-outline-primary" onClick={() => navigate('/projets-assignes')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="h2 mb-0">Détails de la Mission</h1>
      </div>

      <div className="row g-4">
        {/* Colonne de Gauche : Objectifs et Durée */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 p-4 mb-4">
            <h4 className="fw-bold d-flex align-items-center gap-2 mb-3">
              <Target className="text-primary" /> Objectifs de l'enquête
            </h4>
            <p className="text-muted fs-5 leading-relaxed">
              {projet.objectif}
            </p>
            <hr />
            <div className="d-flex align-items-center gap-3 text-dark mt-3">
              <Clock className="text-primary" />
              <div>
                <span className="small text-muted d-block">Période de collecte</span>
                <span className="fw-bold">{projet.duree}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne de Droite : Équipe Assignée */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 p-4 h-100">
            <h4 className="fw-bold d-flex align-items-center gap-2 mb-4">
              <Users className="text-primary" /> Équipe d'enquêteurs
            </h4>
            <div className="list-group list-group-flush">
              {projet.enqueteurs.map(e => (
                <div key={e.id} className="list-group-item px-0 d-flex justify-content-between align-items-center border-light">
                  <div>
                    <div className="fw-bold">{e.nom}</div>
                    <small className="text-muted">{e.role}</small>
                  </div>
                  <CheckCircle2 size={18} className="text-success" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsProjet;