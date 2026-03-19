import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Users, LogOut, ClipboardList } from 'lucide-react';

const DashboardSuperviseur = () => {
  const navigate = useNavigate();

  // Données de démonstration
  const stats = {
    nbEnqueteurs: 12,
    nbProjets: 3
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Barre de navigation haute */}
      <nav className="navbar navbar-dark bg-primary px-4 py-3 shadow">
        <span className="navbar-brand fw-bold fs-3">CIBLETRACK PRO</span>
        <div className="d-flex align-items-center gap-3">
          <button 
            className="btn btn-outline-light d-flex align-items-center gap-2"
            onClick={() => alert("Aller vers modification profil")}
          >
            <UserCircle size={20} /> Modifier mon profil
          </button>
          <button className="btn btn-danger btn-sm shadow-sm" onClick={() => navigate('/login')}>
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <div className="container py-5">
        <h1 className="mb-5 text-center">Bienvenue, <span className="text-primary">Superviseur</span></h1>

        {/* Zone des deux fenêtres placées LATÉRALEMENT au centre */}
        <div className="row justify-content-center g-4">
          
          {/* Fenêtre ENQUÊTEURS */}
          <div className="col-md-5">
            <div className="card shadow border-0 h-100 text-center p-4">
              <div className="card-body d-flex flex-column justify-content-center">
                <div className="text-primary mb-3">
                  <Users size={60} strokeWidth={1.5} />
                </div>
                <h3 className="card-title fw-bold">Enquêteurs</h3>
                <p className="display-4 fw-bold text-dark">{stats.nbEnqueteurs}</p>
                <p className="text-muted">Enquêteurs sous votre supervision</p>
                <button 
                  className="btn btn-primary w-100 py-3 mt-4 fw-bold shadow-sm"
                  onClick={() => navigate('/gestion-enqueteurs')}
                >
                  Gérer vos enquêteurs
                </button>
              </div>
            </div>
          </div>

          {/* Fenêtre PROJETS ASSIGNÉS */}
          <div className="col-md-5">
            <div className="card shadow border-0 h-100 text-center p-4">
              <div className="card-body d-flex flex-column justify-content-center">
                <div className="text-info mb-3">
                  <ClipboardList size={60} strokeWidth={1.5} />
                </div>
                <h3 className="card-title fw-bold">Projets</h3>
                <p className="display-4 fw-bold text-dark">{stats.nbProjets}</p>
                <p className="text-muted">Projets assignés par le chef</p>
                <button 
                  className="btn btn-primary w-100 py-3 mt-4 fw-bold shadow-sm"
                  onClick={() => navigate('/projets-assignes')}
                >
                  Voir mes projets
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardSuperviseur;