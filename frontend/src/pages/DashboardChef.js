import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Shield, UserCircle } from 'lucide-react';

const DashboardChef = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ÉTAPE 1 : On vide la mémoire du navigateur
    localStorage.clear(); 
    
    // ÉTAPE 2 : On redirige vers le login
    // L'utilisateur ne pourra plus revenir en arrière car 'isAuthenticated' sera vide
    navigate('/login'); 
  };

  // Statistiques globales (Maquette)
  const globalStats = {
    nbProjets: 4,
    nbSuperviseurs: 2,
    nbEnqueteursTotal: 24 // Cumul de tous les enquêteurs créés par les superviseurs
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar principale avec Modification Profil et Déconnexion Rouge */}
      <nav className="navbar navbar-dark bg-dark px-4 py-3 shadow">
        <span className="navbar-brand fw-bold fs-3 text-white">CIBLETRACK PRO</span>
        
        <div className="d-flex align-items-center gap-3">
          {/* BOUTON MODIFIER PROFIL */}
          <button 
            className="btn btn-outline-light d-flex align-items-center gap-2 shadow-sm"
            onClick={() => navigate('/modifier-profil')} // <--- Vérifie bien ce chemin
          >
            <UserCircle size={20} /> Modifier mon profil
          </button>

          {/* BOUTON DÉCONNEXION ROUGE */}
          <button className="btn btn-danger d-flex align-items-center gap-2" onClick={handleLogout}>
          <LogOut size={18} /> Déconnexion
        </button>
        </div>
      </nav>

      <div className="container py-5">
        <h1 className="mb-5 text-center fw-bold text-dark">Bienvenue, <span className="text-primary">Chef de Projet</span></h1>

        {/* Disposition des 3 fenêtres LATÉRALEMENT */}
        <div className="row g-4 justify-content-center">
          
          {/* Fenêtre 1 : PROJETS */}
          <div className="col-md-4">
            <div className="card shadow border-0 h-100 text-center p-4">
              <div className="card-body d-flex flex-column">
                <div className="text-primary mb-3">
                  <LayoutDashboard size={50} strokeWidth={1.5} />
                </div>
                <h3 className="fw-bold">Projets</h3>
                <p className="display-4 fw-bold text-dark">{globalStats.nbProjets}</p>
                <p className="text-muted">Projets créés et à ce jour</p>
                <button 
                  className="btn btn-primary w-100 py-2 mt-auto fw-bold"
                  onClick={() => navigate('/gestion-projets')}
                >
                  Gérer vos projets
                </button>
              </div>
            </div>
          </div>

          {/* Fenêtre 2 : SUPERVISEURS */}
          <div className="col-md-4">
            <div className="card shadow border-0 h-100 text-center p-4">
              <div className="card-body d-flex flex-column">
                <div className="text-success mb-3">
                  <Shield size={50} strokeWidth={1.5} />
                </div>
                <h3 className="fw-bold">Superviseurs</h3>
                <p className="display-4 fw-bold text-dark">{globalStats.nbSuperviseurs}</p>
                <p className="text-muted">Superviseurs enregistrés</p>
                <button 
                  className="btn btn-primary w-100 py-2 mt-auto fw-bold"
                  onClick={() => navigate('/gestion-superviseurs')}
                >
                  Gérer vos superviseurs
                </button>
              </div>
            </div>
          </div>

          {/* Fenêtre 3 : ENQUÊTEURS (NOUVELLE) */}
          <div className="col-md-4">
            <div className="card shadow border-0 h-100 text-center p-4 border-bottom border-info border-4">
              <div className="card-body d-flex flex-column">
                <div className="text-info mb-3">
                  <Users size={50} strokeWidth={1.5} />
                </div>
                <h3 className="fw-bold">Enquêteurs</h3>
                <p className="display-4 fw-bold text-dark">{globalStats.nbEnqueteursTotal}</p>
                <p className="text-muted">Enquêteurs créés par les superviseurs</p>
                <button 
                  className="btn btn-primary w-100 py-2 mt-auto fw-bold"
                  onClick={() => navigate('/suivi-global-enqueteurs')}
                >
                  Voir les enquêteurs
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