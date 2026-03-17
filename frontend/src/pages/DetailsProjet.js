import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Clock, Calendar } from 'lucide-react';

const DetailsProjet = () => {
  const navigate = useNavigate();

  // Données de simulation pour la fiche détail
  const projet = {
    nom: "Enquête Satisfaction SABC",
    objectif: "Évaluer le niveau de satisfaction des consommateurs concernant la nouvelle gamme de boissons gazeuses sur le marché de Douala et Yaoundé. L'étude doit identifier les points forts du packaging et les attentes en termes de goût pour les 18-35 ans.",
    duree: "Du 15 Mars au 15 Avril 2026",
    delai: "30 jours calendaires"
  };

  return (
    <div className="container py-5">
      {/* Bouton retour et Titre */}
      <div className="d-flex align-items-center gap-3 mb-5">
        <button className="btn btn-outline-primary shadow-sm" onClick={() => navigate('/projets-assignes')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="h2 mb-0">Détails de la Mission</h1>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="card shadow-sm border-0 overflow-hidden">
            {/* Header de la carte avec le nom du projet */}
            <div className="card-header bg-primary text-white py-3 px-4">
              <h3 className="h5 mb-0 fw-bold">{projet.nom}</h3>
            </div>

            <div className="card-body p-4 p-md-5">
              {/* Section Objectifs */}
              <div className="mb-5">
                <h4 className="fw-bold d-flex align-items-center gap-2 mb-4 text-dark">
                  <Target className="text-primary" size={24} /> 
                  Objectifs de l'enquête
                </h4>
                <p className="text-muted fs-5 lh-base bg-light p-4 rounded-3 border-start border-primary border-4">
                  {projet.objectif}
                </p>
              </div>

              <hr className="my-5 opacity-10" />

              {/* Section Temps et Durée */}
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <span className="small text-muted d-block text-uppercase fw-bold">Période de collecte</span>
                      <span className="fw-bold fs-5">{projet.duree}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-info bg-opacity-10 p-3 rounded-circle text-info">
                      <Clock size={24} />
                    </div>
                    <div>
                      <span className="small text-muted d-block text-uppercase fw-bold">Délai imparti</span>
                      <span className="fw-bold fs-5">{projet.delai}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pied de page informatif */}
            <div className="card-footer bg-light py-3 px-4 border-0 text-center">
              <small className="text-muted italic">
                Informations transmises par la Direction Technique - CIBLETRACK PRO
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsProjet;