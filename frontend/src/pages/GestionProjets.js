import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Edit3, AlertTriangle, Trash2, Filter, ClipboardList } from 'lucide-react';

const GestionProjets = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // NOUVEL ÉTAT POUR LE FILTRE PAR STATUT
  const [filterStatus, setFilterStatus] = useState("tous");

  // ÉTATS POUR LA SUPPRESSION
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Données de démonstration mises à jour avec tes nouveaux statuts
  const [projets, setProjets] = useState([
    { id: 1, nom: "Enquête Satisfaction SABC", client: "Brasseries du Cameroun", date: "12/03/2026", statut: "Terminé" },
    { id: 2, nom: "Audit Qualité Orange", client: "Orange CM", date: "15/03/2026", statut: "Disponible" },
    { id: 3, nom: "Test Produit Nestlé", client: "Nestlé", date: "20/03/2026", statut: "Disponible" },
    { id: 4, nom: "Sondage Élections", client: "Gouv", date: "01/01/2026", statut: "En cours" },
  ]);

  // Fonction pour les couleurs des badges
  const getBadgeClass = (statut) => {
    switch (statut.toLowerCase()) {
      case 'terminé': return 'bg-secondary text-white'; // Gris
      case 'en cours': return 'bg-success text-white';   // Vert
      case 'en attente': return 'bg-warning text-dark';  // Jaune
      case 'disponible': return 'bg-danger text-white';  // Rouge
      default: return 'bg-light text-dark';
    }
  };

  const confirmDelete = (projet) => {
    setProjectToDelete(projet);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setProjets(projets.filter(p => p.id !== projectToDelete.id));
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  // LOGIQUE DE FILTRAGE MISE À JOUR (Recherche + Boutons Statut)
  const projetsFiltrés = projets.filter(p => {
    const matchRecherche = p.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatut = filterStatus === "tous" || p.statut.toLowerCase() === filterStatus.toLowerCase();
    
    return matchRecherche && matchStatut;
  });

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <button className="btn btn-outline-secondary" onClick={() => navigate('/chef-dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="h2 mb-0 fw-bold">Gestion des Projets</h1>
      </div>

      <div className="card shadow-sm border-0 p-4 mb-4">
        {/* --- BARRE DE RECHERCHE --- */}
        <div className="row g-3 align-items-center mb-4">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <Search size={18} className="text-muted" />
              </span>
              <input 
                type="text" 
                className="form-control border-start-0" 
                placeholder="Rechercher un projet" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4 text-md-end">
            <button 
              className="btn btn-primary d-flex align-items-center gap-2 ms-auto fw-bold shadow-sm"
              onClick={() => navigate('/creer-projet')} // Redirection vers la nouvelle page
            >
              <Plus size={18} /> Nouveau Projet
            </button>
          </div>
        </div>

        {/* --- BARRE DE FILTRES (Juste en bas de la recherche) --- */}
        <div className="d-flex align-items-center gap-2 flex-wrap border-top pt-3">
          <span className="text-muted small fw-bold text-uppercase d-flex align-items-center gap-1">
            <Filter size={14} /> Filtrer :
          </span>
          {['tous', 'en attente', 'en cours', 'disponible', 'terminé'].map((s) => (
            <button
              key={s}
              className={`btn btn-sm rounded-pill px-3 fw-bold transition-all ${
                filterStatus === s ? 'btn-primary shadow-sm' : 'btn-outline-secondary'
              }`}
              onClick={() => setFilterStatus(s)}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Tableau des projets */}
      <div className="card shadow-sm border-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th className="px-4">Nom du Projet</th>
                <th>Client</th>
                <th>Date Début</th>
                <th>Statut</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projetsFiltrés.map(projet => (
                <tr key={projet.id}>
                  <td className="fw-bold text-primary px-4" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/suivi-projet/${projet.id}`)}>
                    <ClipboardList size={16} className="me-2" />
                    {projet.nom}
                  </td>
                  <td>{projet.client}</td>
                  <td>{projet.date}</td>
                  <td>
                    <span className={`badge rounded-pill px-3 py-2 ${getBadgeClass(projet.statut)}`}>
                      {projet.statut.toUpperCase()}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <button 
                        className="btn btn-sm btn-outline-info" 
                        title="Modifier"
                        onClick={() => navigate(`/modifier-projet/${projet.id}`)} // Redirection ici
                      >
                        <Edit3 size={16} />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" title="Supprimer" onClick={() => confirmDelete(projet)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projetsFiltrés.length === 0 && (
            <div className="text-center py-5 text-muted bg-light">
              Aucun projet trouvé avec ces critères.
            </div>
          )}
        </div>
      </div>

      {/* MODAL DE SUPPRESSION (Gardé tel quel car il fonctionne bien) */}
      {showDeleteModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-body text-center p-5">
                <div className="text-danger mb-4"><AlertTriangle size={60} /></div>
                <h3 className="fw-bold mb-3">Supprimer le projet ?</h3>
                <p className="text-muted mb-4">
                  Êtes-vous sûr de vouloir supprimer <strong>{projectToDelete?.nom}</strong> ?
                </p>
                <div className="d-flex gap-3">
                  <button className="btn btn-light w-100 py-2 fw-bold" onClick={() => setShowDeleteModal(false)}>Annuler</button>
                  <button className="btn btn-danger w-100 py-2 fw-bold" onClick={handleDelete}>Oui, Supprimer</button>
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