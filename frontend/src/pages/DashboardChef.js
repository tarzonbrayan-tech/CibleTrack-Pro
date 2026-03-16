import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Briefcase, Users, LogOut } from 'lucide-react';

const DashboardChef = () => {
  const navigate = useNavigate();

  // Données de démonstration pour la maquette
  const stats = {
    nbProjets: 5,
    nbSuperviseurs: 3
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Barre de navigation haute */}
      <nav className="navbar navbar-dark bg-dark px-4 py-3 shadow">
        <span className="navbar-brand fw-bold fs-3">CIBLETRACK PRO</span>
        <div className="d-flex align-items-center gap-3">
          <button 
            className="btn btn-outline-light d-flex align-items-center gap-2"
            onClick={() => alert("Aller vers modification profil")}
          >
            <UserCircle size={20} /> Modifier mon profil
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => navigate('/login')}>
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <div className="container py-5">
        <h1 className="mb-5 text-center">Bienvenue, <span className="text-primary">Chef de Projet</span></h1>

        {/* Zone des deux fenêtres latérales au centre */}
        <div className="row justify-content-center g-4">
          
          {/* Fenêtre PROJETS */}
          <div className="col-md-5">
            <div className="card shadow-sm border-0 h-100 text-center p-4">
              <div className="card-body">
                <div className="text-primary mb-3">
                  <Briefcase size={48} />
                </div>
                <h3 className="card-title">Projets</h3>
                <p className="display-4 fw-bold">{stats.nbProjets}</p>
                <p className="text-muted">Projets créés à ce jour</p>
                <button 
                  className="btn btn-primary w-100 py-2 mt-3"
                  onClick={() => navigate('/gestion-projets')}
                >
                  Gérer vos projets
                </button>
              </div>
            </div>
          </div>

          {/* Fenêtre SUPERVISEURS */}
          <div className="col-md-5">
            <div className="card shadow-sm border-0 h-100 text-center p-4">
              <div className="card-body">
                <div className="text-info mb-3">
                  <Users size={48} />
                </div>
                <h3 className="card-title">Superviseurs</h3>
                <p className="display-4 fw-bold">{stats.nbSuperviseurs}</p>
                <p className="text-muted">Superviseurs enregistrés</p>
                <button 
                  className="btn btn-primary w-100 py-2 mt-3"
                  onClick={() => navigate('/gestion-superviseurs')}
                >
                  Gérer vos superviseurs
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardChef;