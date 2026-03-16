import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Search, User, Phone, Mail, Trash2, ShieldCheck } from 'lucide-react';

const GestionSuperviseurs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Données de démonstration pour la maquette
  const [superviseurs, setSuperviseurs] = useState([
    { id: 1, nom: "Alice Bella", email: "alice@cibletrack.com", tel: "+237 677 00 00 01", statut: "Actif" },
    { id: 2, nom: "Marc Owona", email: "marc@cibletrack.com", tel: "+237 699 00 00 02", statut: "En attente" },
  ]);

  const filtrés = superviseurs.filter(s => 
    s.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      {/* En-tête avec retour */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <button className="btn btn-outline-secondary" onClick={() => navigate('/chef-dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="h2 mb-0">Gestion des Superviseurs</h1>
      </div>

      <div className="card shadow-sm border-0 p-4">
        {/* Barre de recherche et bouton d'ajout */}
        <div className="row g-3 mb-4 align-items-center">
          <div className="col-md-6">
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-end-0"><Search size={18} /></span>
              <input 
                type="text" 
                className="form-control border-start-0" 
                placeholder="Rechercher un collaborateur..." 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 text-md-end">
            <button className="btn btn-primary d-flex align-items-center gap-2 ms-auto shadow-sm">
              <UserPlus size={18} /> Ajouter un Superviseur
            </button>
          </div>
        </div>

        {/* Tableau des collaborateurs */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Nom & Prénom</th>
                <th>Contact</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtrés.map(s => (
                <tr key={s.id}>
                  <td className="fw-bold"><User size={16} className="me-2 text-primary"/>{s.nom}</td>
                  <td>
                    <div className="small text-muted"><Mail size={12} /> {s.email}</div>
                    <div className="small text-muted"><Phone size={12} /> {s.tel}</div>
                  </td>
                  <td><span className="badge bg-info text-dark">Superviseur</span></td>
                  <td>
                    <span className={`badge rounded-pill ${s.statut === 'Actif' ? 'bg-success' : 'bg-secondary'}`}>
                      {s.statut}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-sm btn-outline-warning" title="Réinitialiser MDP">
                        <ShieldCheck size={16} />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => setSuperviseurs(superviseurs.filter(item => item.id !== s.id))}>
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
    </div>
  );
};

export default GestionSuperviseurs;