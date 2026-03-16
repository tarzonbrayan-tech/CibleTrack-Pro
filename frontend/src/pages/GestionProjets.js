import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Folder, Search, Edit3, AlertTriangle, Trash2 } from 'lucide-react';

const GestionProjets = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // ÉTATS POUR LA SUPPRESSION
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Données de démonstration pour la maquette
  const [projets, setProjets] = useState([
  { id: 1, nom: "Enquête Satisfaction SABC", client: "Brasseries du Cameroun", chef: "Jean Dupont", date: "12/03/2026", statut: "En cours" },
  { id: 2, nom: "Audit Qualité Orange", client: "Orange CM", chef: "Marie Sali", date: "15/03/2026", statut: "En attente" },
]);
   
   // Fonction pour ouvrir la confirmation
  const confirmDelete = (projet) => {
    setProjectToDelete(projet);
    setShowDeleteModal(true);
  };
   
   // Fonction pour supprimer réellement (Simulation)
  const handleDelete = () => {
    setProjets(projets.filter(p => p.id !== projectToDelete.id));
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  // Filtrage pour la barre de recherche
  const projetsFiltrés = projets.filter(p => 
    p.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.chef.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      {/* Retour et Titre */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <button className="btn btn-outline-secondary" onClick={() => navigate('/chef-dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="h2 mb-0">Gestion des Projets</h1>
      </div>

      <div className="card shadow-sm border-0 p-4">
        {/* Barre d'outils (Recherche + Bouton Ajouter) */}
        <div className="row g-3 mb-4 align-items-center">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <Search size={18} className="text-muted" />
              </span>
              <input 
                type="text" 
                className="form-control border-start-0" 
                placeholder="Rechercher un projet ou un chef..." 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 text-md-end">
            <button className="btn btn-primary d-flex align-items-center gap-2 ms-auto">
              <Plus size={18} /> Nouveau Projet
            </button>
          </div>
        </div>

        {/* Tableau des projets */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Nom du Projet</th>
                <th>Client</th>
                <th>Chef Responsable</th>
                <th>Date Début</th>
                <th>Statut</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projetsFiltrés.map(projet => (
                <tr key={projet.id}>
                  <td className="fw-bold text-dark">{projet.nom}</td>
                  <td>{projet.client}</td>
                  <td>
                    <span className="badge bg-light text-dark border">
                      {projet.chef}
                    </span>
                  </td>
                  <td>{projet.date}</td>
                  <td>
                    <span className={`badge ${projet.statut === 'En cours' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {projet.statut}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-sm btn-outline-info" title="Modifier">
                        <Edit3 size={16} />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" title="Supprimer"
                              onClick={() => confirmDelete(projet)} // On appelle la confirmation
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {projetsFiltrés.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    Aucun projet trouvé pour "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* --- MODAL DE CONFIRMATION DE SUPPRESSION --- */}
      {showDeleteModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-body text-center p-5">
                <div className="text-danger mb-4">
                  <AlertTriangle size={60} />
                </div>
                <h3 className="fw-bold mb-3">Supprimer le projet ?</h3>
                <p className="text-muted mb-4">
                  Êtes-vous sûr de vouloir supprimer <strong>{projectToDelete?.nom}</strong> ? <br/>
                  Cette action est irréversible.
                </p>
                <div className="d-flex gap-3">
                  <button className="btn btn-light w-100 py-2 fw-bold" onClick={() => setShowDeleteModal(false)}>
                    Annuler
                  </button>
                  <button className="btn btn-danger w-100 py-2 fw-bold" onClick={handleDelete}>
                    Oui, Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionProjets;