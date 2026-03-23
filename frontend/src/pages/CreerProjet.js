import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, FolderPlus, Building, Calendar } from 'lucide-react';

const CreerProjet = () => {
  const navigate = useNavigate();

  // État initial du nouveau projet
  const [nouveauProjet, setNouveauProjet] = useState({
    nom: "",
    client: "",
    date: new Date().toLocaleDateString('fr-FR'), // Date du jour par défaut
    statut: "Disponible" // Statut par défaut (Rouge selon tes critères)
  });

  const handleChange = (e) => {
    setNouveauProjet({ ...nouveauProjet, [e.target.name]: e.target.value });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    // Logique de sauvegarde (Simulation)
    console.log("Nouveau projet créé :", nouveauProjet);
    
    // Ici, dans une vraie application, tu ferais un POST vers ton API
    alert(`Le projet "${nouveauProjet.nom}" a été créé avec succès !`);
    
    // Retour à la liste des projets
    navigate('/gestion-projets');
  };

  return (
    <div className="container py-5">
      {/* En-tête */}
      <div className="d-flex align-items-center gap-3 mb-5">
        <button className="btn btn-outline-dark shadow-sm rounded-circle p-2" onClick={() => navigate('/gestion-projets')}>
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="h2 mb-0 fw-bold">Créer un Nouveau Projet</h1>
          <p className="text-muted mb-0">Remplissez les informations pour lancer une nouvelle enquête.</p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow border-0 p-4 p-md-5 bg-white">
            
            <div className="text-center mb-5">
              <div className="bg-primary bg-opacity-10 p-4 rounded-circle d-inline-block text-primary mb-3">
                <FolderPlus size={45} />
              </div>
            </div>

            <form onSubmit={handleCreate}>
              {/* NOM DU PROJET */}
              <div className="mb-4">
                <label className="form-label fw-bold text-muted small text-uppercase">Nom du Projet</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><FolderPlus size={18} /></span>
                  <input 
                    type="text" 
                    name="nom"
                    className="form-control form-control-lg border-start-0 bg-light shadow-none" 
                    placeholder="Ex: Enquête de satisfaction client..."
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              {/* NOM DU CLIENT */}
              <div className="mb-4">
                <label className="form-label fw-bold text-muted small text-uppercase">Client / Entreprise</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><Building size={18} /></span>
                  <input 
                    type="text" 
                    name="client"
                    className="form-control form-control-lg border-start-0 bg-light shadow-none" 
                    placeholder="Ex: SABC, Orange, MTN..."
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              {/* DATE ET STATUT */}
              <div className="row g-3 mb-5">
                <div className="col-md-6">
                  <label className="form-label fw-bold text-muted small text-uppercase">Date de début</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><Calendar size={18} /></span>
                    <input 
                      type="date" 
                      name="date"
                      className="form-control border-start-0 bg-light shadow-none" 
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-muted small text-uppercase">Statut Initial</label>
                  <select 
                    name="statut"
                    className="form-select border-primary border-opacity-25 bg-light fw-bold"
                    onChange={handleChange}
                    defaultValue="Disponible"
                  >
                    <option value="Disponible">Disponible (Rouge)</option>
                    <option value="En attente">En attente (Jaune)</option>
                    <option value="En cours">En cours (Vert)</option>
                  </select>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="d-grid gap-3">
                <button type="submit" className="btn btn-primary btn-lg fw-bold py-3 shadow d-flex align-items-center justify-content-center gap-2">
                  <Save size={20} /> Lancer le projet
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-danger btn-lg fw-bold py-3 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => navigate('/gestion-projets')}
                >
                  <X size={20} /> Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreerProjet;