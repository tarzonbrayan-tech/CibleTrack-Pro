import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, X, ClipboardEdit } from 'lucide-react';

const ModifierProjet = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID depuis l'URL

  // État du formulaire
  const [nom, setNom] = useState("");
  const [statut, setStatut] = useState("");

  // Simulation de récupération des données existantes
  useEffect(() => {
    // Ici, tu ferais normalement un appel API ou une recherche dans ton état global
    // Pour la maquette, on simule des données reçues :
    if (id === "1") {
      setNom("Enquête Satisfaction SABC");
      setStatut("En cours");
    } else if (id === "2") {
      setNom("Audit Qualité Orange");
      setStatut("En attente");
    }
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    // Logique pour enregistrer (Update)
    console.log("Enregistrement :", { id, nom, statut });
    alert("Modifications enregistrées avec succès !");
    navigate('/gestion-projets');
  };

  return (
    <div className="container py-5">
      {/* Retour rapide */}
      <div className="d-flex align-items-center gap-3 mb-5">
        <button className="btn btn-outline-secondary shadow-sm" onClick={() => navigate('/gestion-projets')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="h2 mb-0 fw-bold text-dark">Modifier le Projet</h1>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow border-0 p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block text-primary mb-3">
                <ClipboardEdit size={40} />
              </div>
              <p className="text-muted">ID du projet : <span className="fw-bold">#{id}</span></p>
            </div>

            <form onSubmit={handleSave}>
              {/* CHAMP NOM DU PROJET */}
              <div className="mb-4">
                <label className="form-label fw-bold small text-uppercase">Nom du projet</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg border-primary border-opacity-25" 
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>

              {/* CHAMP STATUT */}
              <div className="mb-5">
                <label className="form-label fw-bold small text-uppercase">Statut actuel</label>
                <select 
                  className="form-select form-select-lg border-primary border-opacity-25"
                  value={statut}
                  onChange={(e) => setStatut(e.target.value)}
                >
                  <option value="Disponible">Disponible</option>
                  <option value="En cours">En cours</option>
                  <option value="En attente">En attente</option>
                  <option value="Terminé">Terminé</option>
                </select>
              </div>

              {/* BOUTONS D'ACTION */}
              <div className="d-grid gap-3">
                <button type="submit" className="btn btn-primary btn-lg fw-bold d-flex align-items-center justify-content-center gap-2 shadow">
                  <Save size={20} /> Enregistrer les modifications
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-danger btn-lg fw-bold d-flex align-items-center justify-content-center gap-2"
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

export default ModifierProjet;