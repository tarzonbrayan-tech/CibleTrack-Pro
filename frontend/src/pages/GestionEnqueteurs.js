import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Search, Smartphone, User, Trash2, Star, History, MoreVertical, Filter, CheckCircle } from 'lucide-react';

const GestionEnqueteurs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Données de démonstration (Maquette)
  const [enqueteurs, setEnqueteurs] = useState([
    { id: 1, nom: "Paul Biya", email: "paul@terrain.com", tel: "677112233", statut: "Sur le terrain" },
    { id: 2, nom: "Marie Ngo", email: "marie@terrain.com", tel: "699445566", statut: "Disponible" },
  ]);

  const filtrés = enqueteurs.filter(e => 
    e.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <button className="btn btn-outline-primary" onClick={() => navigate('/superviseur-dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="mb-4 text-primary">Gestion & Evaluation de Performance des Enquêteurs</h1>
      </div>

      <div className="card shadow-sm border-0 p-4">
        <div className="row g-3 mb-4 align-items-center">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><Search size={18} /></span>
              <input 
                type="text" 
                className="form-control border-start-0" 
                placeholder="Rechercher un enquêteur..." 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 text-md-end">
            <button className="btn btn-primary d-flex align-items-center gap-2 ms-auto">
              <UserPlus size={18} /> Nouvel Enquêteur
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Nom de l'Enquêteur</th>
                <th>Contact</th>
                <th>Statut Mission</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtrés.map(e => (
                <tr key={e.id}>
                  <td className="fw-bold"><User size={16} className="me-2 text-primary"/>{e.nom}</td>
                  <td>
                    <div className="small">{e.email}</div>
                    <div className="small text-muted"><Smartphone size={12} /> {e.tel}</div>
                  </td>
                  <td>
                    <span className={`badge rounded-pill ${e.statut === 'Sur le terrain' ? 'bg-warning text-dark' : 'bg-success'}`}>
                      {e.statut}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-sm btn-outline-success" title="Assigner Mission">
                        <CheckCircle size={16} />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => setEnqueteurs(enqueteurs.filter(item => item.id !== e.id))}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Barre de Filtres Avancés */}
      <div className="card border-0 shadow-sm p-3 mb-4 bg-light">
        <div className="row g-2">
          <div className="col-md-3">
            <select className="form-select"><option>Genre (Tous)</option><option>Masculin</option><option>Féminin</option></select>
          </div>
          <div className="col-md-3">
            <select className="form-select"><option>Niveau d'études</option><option>Bac+3</option><option>Bac+5</option></select>
          </div>
          <div className="col-md-3">
            <select className="form-select"><option>Expérience</option><option>Débutant</option><option>Expert</option></select>
          </div>
          <div className="col-md-3">
            <button className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2">
              <Filter size={18}/> Filtrer
            </button>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <table className="table align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>Nom / Domaine</th>
              <th>Changer Statut</th>
              <th className="text-center">Évaluer</th>
              <th className="text-center">Historique</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="fw-bold">Paul Biya</div>
                <div className="small text-muted">Sciences Sociales</div>
              </td>
              <td>
                <select className="form-select form-select-sm w-auto border-primary">
                  <option value="bien">Bien</option>
                  <option value="disponible">Disponible</option>
                  <option value="indisponible">Indisponible</option>
                  <option value="blamer text-warning">Blâmer</option>
                  <option value="exclus text-danger">Exclus</option>
                </select>
              </td>
              <td className="text-center">
                <button className="btn btn-sm btn-warning" onClick={() => navigate('/evaluation-enqueteur')}>
                  <Star size={18} fill="white" />
                </button>
              </td>
              <td className="text-center">
                <button className="btn btn-sm btn-outline-info" title="Voir performances précédentes">
                  <History size={18} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionEnqueteurs;