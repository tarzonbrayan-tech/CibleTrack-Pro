import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Edit3, Building, Calendar } from 'lucide-react';

const ModifierProjet = ({ projets, modifierProjet }) => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const navigate = useNavigate();

  // État local pour le formulaire
  const [formData, setFormData] = useState({
    id: null,
    nom: "",
    client: "",
    date: "",
    statut: ""
  });

  // Charger les données du projet au montage du composant
  useEffect(() => {
    const projetAEditer = projets.find(p => p.id === parseInt(id));
    if (projetAEditer) {
      setFormData(projetAEditer);
    } else {
      // Si le projet n'existe pas, on redirige
      navigate('/gestion-projets');
    }
  }, [id, projets, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    modifierProjet(formData); // Appel de la fonction globale
    alert("Projet mis à jour avec succès !");
    navigate('/gestion-projets');
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-5">
        <button className="btn btn-outline-dark shadow-sm rounded-circle p-2" onClick={() => navigate('/gestion-projets')}>
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="h2 mb-0 fw-bold">Modifier le Projet</h1>
          <p className="text-muted mb-0">Identifiant du projet : #{id}</p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow border-0 p-4 p-md-5 bg-white">
            <div className="text-center mb-5">
              <div className="bg-info bg-opacity-10 p-4 rounded-circle d-inline-block text-info mb-3">
                <Edit3 size={45} />
              </div>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="form-label fw-bold text-muted small text-uppercase">Nom du Projet</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><Edit3 size={18} /></span>
                  <input 
                    type="text" 
                    name="nom"
                    className="form-control form-control-lg border-start-0 bg-light shadow-none" 
                    value={formData.nom}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold text-muted small text-uppercase">Client / Entreprise</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><Building size={18} /></span>
                  <input 
                    type="text" 
                    name="client"
                    className="form-control form-control-lg border-start-0 bg-light shadow-none" 
                    value={formData.client}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="row g-3 mb-5">
                <div className="col-md-6">
                  <label className="form-label fw-bold text-muted small text-uppercase">Date de début</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><Calendar size={18} /></span>
                    <input 
                      type="text" 
                      name="date"
                      className="form-control border-start-0 bg-light shadow-none" 
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-muted small text-uppercase">Statut Actuel</label>
                  <select 
                    name="statut"
                    className="form-select border-info border-opacity-25 bg-light fw-bold"
                    value={formData.statut}
                    onChange={handleChange}
                  >
                    <option value="Disponible">Disponible (Rouge)</option>
                    <option value="En attente">En attente (Jaune)</option>
                    <option value="En cours">En cours (Vert)</option>
                    <option value="Terminé">Terminé (Gris)</option>
                  </select>
                </div>
              </div>

              <div className="d-grid gap-3">
                <button type="submit" className="btn btn-info text-white btn-lg fw-bold py-3 shadow d-flex align-items-center justify-content-center gap-2">
                  <Save size={20} /> Enregistrer les changements
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary btn-lg fw-bold py-3"
                  onClick={() => navigate('/gestion-projets')}
                >
                  Annuler
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