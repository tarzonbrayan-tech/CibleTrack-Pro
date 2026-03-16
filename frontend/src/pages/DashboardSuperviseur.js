import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Users, LogOut } from 'lucide-react';

const DashboardSuperviseur = () => {
  const navigate = useNavigate();

  // Données de démonstration pour la maquette
  const stats = {
    nbEnqueteurs: 12
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Barre de navigation haute */}
      <nav className="navbar navbar-dark bg-primary px-4 py-3 shadow">
        <span className="navbar-brand fw-bold fs-3">CIBLETRACK PRO | Superviseur</span>
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

        {/* Fenêtre centrale pour les enquêteurs */}
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow border-0 text-center p-4">
              <div className="card-body">
                <div className="text-primary mb-3">
                  <Users size={60} strokeWidth={1.5} />
                </div>
                <h3 className="card-title fw-bold">Enquêteurs</h3>
                <p className="display-3 fw-bold text-dark">{stats.nbEnqueteurs}</p>
                <p className="text-muted fs-5">Enquêteurs sous votre supervision</p>
                
                <button 
                  className="btn btn-primary w-100 py-3 mt-4 fs-5 fw-bold shadow-sm"
                  onClick={() => navigate('/gestion-enqueteurs')}
                >
                  Gérer vos enquêteurs
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