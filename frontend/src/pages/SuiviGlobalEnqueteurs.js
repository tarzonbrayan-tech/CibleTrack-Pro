import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Filter, Eye, Edit, Star, 
  User, GraduationCap, Briefcase, MapPin 
} from 'lucide-react';

const SuiviGlobalEnqueteurs = () => {
  const navigate = useNavigate();
  
  // États pour la recherche et les filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("Tous");
  const [filterDomaine, setFilterDomaine] = useState("Tous");
  const [filterNiveau, setFilterNiveau] = useState("Tous");
  const [filterExp, setFilterExp] = useState("Tous");

  // Données de démonstration (Normalement reçues du backend/superviseurs)
  const [enqueteurs, setEnqueteurs] = useState([
    { 
      id: 1, matricule: "ENQ-2026-001", nom: "EBOGO", prenom: "Jean", 
      telephone: "699887766", ville: "Yaoundé", niveau: "LICENSE", 
      domaine: "Sociologie", genre: "Masculin", experience: "Intermédiaire", statut: "Bien" 
    },
    { 
      id: 2, matricule: "ENQ-2026-002", nom: "NGO", prenom: "Marie", 
      telephone: "677112233", ville: "Douala", niveau: "MASTER", 
      domaine: "Statistiques", genre: "Féminin", experience: "Professionnel", statut: "Bien" 
    },
    { 
      id: 3, matricule: "ENQ-2026-003", nom: "TCHINDA", prenom: "Paul", 
      telephone: "655443322", ville: "Bafoussam", niveau: "BAC", 
      domaine: "Informatique", genre: "Masculin", experience: "Débutant", statut: "Indisponible" 
    }
  ]);

  // Logique de filtrage
  const filteredEnqueteurs = enqueteurs.filter(enq => {
    const matchSearch = (enq.nom + enq.prenom + enq.matricule).toLowerCase().includes(searchTerm.toLowerCase());
    const matchGenre = filterGenre === "Tous" || enq.genre === filterGenre;
    const matchDomaine = filterDomaine === "Tous" || enq.domaine === filterDomaine;
    const matchNiveau = filterNiveau === "Tous" || enq.niveau === filterNiveau;
    const matchExp = filterExp === "Tous" || enq.experience === filterExp;
    
    return matchSearch && matchGenre && matchDomaine && matchNiveau && matchExp;
  });

  // Fonction pour la couleur du statut
  const getStatutBadge = (statut) => {
    const styles = {
      "Bien": "bg-success",
      "Indisponible": "bg-warning text-dark",
      "Blâmer": "bg-orange", // Nécessite une classe personnalisée ou style inline
      "Exclus": "bg-danger"
    };
    return `badge ${styles[statut] || "bg-secondary"}`;
  };

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      {/* En-tête */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <button className="btn btn-outline-dark rounded-circle" onClick={() => navigate('/chef-dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="fw-bold mb-0 text-dark">Suivi Global des Enquêteurs</h2>
      </div>

      {/* Zone de Recherche et Filtres */}
      <div className="card shadow-sm border-0 mb-4 p-3">
        <div className="row g-3">
          {/* Barre de recherche */}
          <div className="col-12">
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-end-0"><Search size={18} className="text-muted" /></span>
              <input 
                type="text" 
                className="form-control border-start-0 py-2" 
                placeholder="Rechercher par nom, prénom ou matricule..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filtres */}
          <div className="col-md-3">
            <select className="form-select border-0 shadow-sm" value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
              <option value="Tous">Tous les genres</option>
              <option value="Masculin">Masculin</option>
              <option value="Féminin">Féminin</option>
              <option value="Autres">Autres</option>
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-select border-0 shadow-sm" value={filterNiveau} onChange={(e) => setFilterNiveau(e.target.value)}>
              <option value="Tous">Tous les niveaux</option>
              <option value="BAC">BAC</option>
              <option value="BTS">BTS</option>
              <option value="DUT">DUT</option>
              <option value="LICENSE">LICENSE</option>
              <option value="MASTER">MASTER</option>
              <option value="DOCTORAT">DOCTORAT</option>
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-select border-0 shadow-sm" value={filterExp} onChange={(e) => setFilterExp(e.target.value)}>
              <option value="Tous">Toutes expériences</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Professionnel">Professionnel</option>
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-select border-0 shadow-sm" value={filterDomaine} onChange={(e) => setFilterDomaine(e.target.value)}>
              <option value="Tous">Tous les domaines</option>
              <option value="Sociologie">Sociologie</option>
              <option value="Statistiques">Statistiques</option>
              <option value="Informatique">Informatique</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des Enquêteurs */}
      <div className="card shadow border-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Matricule</th>
                <th>Nom & Prénom</th>
                <th>Téléphone</th>
                <th>Ville</th>
                <th>Niveau/Domaine</th>
                <th>Genre</th>
                <th>Expérience</th>
                <th>Statut</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnqueteurs.map((enq) => (
                <tr key={enq.id}>
                  <td className="fw-bold text-primary small">{enq.matricule}</td>
                  <td>{enq.nom} {enq.prenom}</td>
                  <td>{enq.telephone}</td>
                  <td><MapPin size={14} className="me-1" />{enq.ville}</td>
                  <td>
                    <div className="small fw-bold">{enq.niveau}</div>
                    <div className="small text-muted">{enq.domaine}</div>
                  </td>
                  <td>{enq.genre}</td>
                  <td>{enq.experience}</td>
                  <td>
                    <span className={getStatutBadge(enq.statut)}>{enq.statut}</span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-sm btn-outline-primary" title="Voir" onClick={() => navigate(`/details-enqueteur/${enq.id}`)}>
                        <Eye size={16} />
                      </button>
                      <button className="btn btn-sm btn-outline-info" title="Modifier" onClick={() => navigate(`/modifier-enqueteur/${enq.id}`)}>
                        <Edit size={16} />
                      </button>
                      <button className="btn btn-sm btn-outline-warning" title="Évaluer" onClick={() => navigate(`/evaluation-enqueteur/${enq.id}`)}>
                        <Star size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredEnqueteurs.length === 0 && (
            <div className="p-5 text-center text-muted">
              Aucun enquêteur ne correspond à vos critères.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuiviGlobalEnqueteurs;