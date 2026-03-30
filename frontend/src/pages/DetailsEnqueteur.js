import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, User, Mail, Phone, MapPin, GraduationCap, 
  Briefcase, ShieldCheck, Calendar, FileText, Star 
} from 'lucide-react';

const DetailsEnqueteur = ({ enqueteurs }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enq, setEnq] = useState(null);

  useEffect(() => {
    const cible = enqueteurs.find(e => e.id === parseInt(id));
    if (cible) setEnq(cible);
  }, [id, enqueteurs]);

  if (!enq) return <div className="p-5 text-center">Chargement du profil...</div>;

  return (
    <div className="container py-5">
      {/* Bouton Retour */}
      <button className="btn btn-link text-decoration-none text-dark mb-4 p-0 d-flex align-items-center gap-2" 
              onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Retour à la liste
      </button>

      <div className="row g-4">
        
        {/* COLONNE GAUCHE : PROFIL GÉNÉRAL */}
        <div className="col-lg-4">
          <div className="card shadow border-0 overflow-hidden">
            <div className="bg-primary p-5 text-center">
              <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center shadow" style={{ width: '100px', height: '100px' }}>
                <User size={50} className="text-primary" />
              </div>
              <h3 className="text-white mt-3 mb-0 fw-bold">{enq.nom} {enq.prenom}</h3>
              <span className="badge bg-light text-primary mt-2">{enq.matricule}</span>
            </div>
            
            <div className="card-body p-4">
              <h6 className="text-muted text-uppercase fw-bold small mb-3 border-bottom pb-2">Contact</h6>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-light p-2 rounded"><Phone size={18} className="text-primary" /></div>
                <div><small className="text-muted d-block">Téléphone</small><span className="fw-medium">{enq.telephone}</span></div>
              </div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-light p-2 rounded"><MapPin size={18} className="text-primary" /></div>
                <div><small className="text-muted d-block">Localisation</small><span className="fw-medium">{enq.ville}, Cameroun</span></div>
              </div>
              
              <h6 className="text-muted text-uppercase fw-bold small mb-3 mt-4 border-bottom pb-2">Formation</h6>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-light p-2 rounded"><GraduationCap size={18} className="text-success" /></div>
                <div><small className="text-muted d-block">Diplôme</small><span className="fw-medium">{enq.niveau} en {enq.domaine}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : PERFORMANCE & HISTORIQUE */}
        <div className="col-lg-8">
          
          {/* Carte Statut Actuel */}
          <div className="card shadow border-0 mb-4 p-4 border-start border-4 border-primary">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h5 className="fw-bold mb-1">Statut de collaboration</h5>
                <p className="text-muted mb-0 small">Dernière mise à jour effectuée par le Superviseur.</p>
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <span className={`badge fs-6 px-4 py-2 ${enq.statut === 'Exclus' ? 'bg-danger' : 'bg-success'}`}>
                  {enq.statut}
                </span>
              </div>
            </div>
          </div>

          {/* Grid d'infos secondaires */}
          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <div className="card shadow border-0 p-3 h-100">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-warning bg-opacity-10 p-3 rounded text-warning"><Briefcase size={24} /></div>
                  <div><h6 className="mb-0 fw-bold">Expérience</h6><p className="mb-0 text-muted">{enq.experience}</p></div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow border-0 p-3 h-100">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-info bg-opacity-10 p-3 rounded text-info"><ShieldCheck size={24} /></div>
                  <div><h6 className="mb-0 fw-bold">Genre</h6><p className="mb-0 text-muted">{enq.genre}</p></div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Historique / Missions (Maquette) */}
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Historique des Missions</h5>
              <button className="btn btn-sm btn-outline-primary" onClick={() => navigate(`/evaluation-enqueteur/${enq.id}`)}>
                <Star size={16} className="me-1" /> Évaluer l'agent
              </button>
            </div>
            
            <div className="table-responsive">
              <table className="table table-sm align-middle text-muted">
                <thead>
                  <tr>
                    <th>Mission</th>
                    <th>Date</th>
                    <th className="text-center">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><FileText size={14} className="me-2"/>Étude SABC - Impact 2026</td>
                    <td>Jan 2026</td>
                    <td className="text-center"><span className="badge bg-light text-dark">4.5 / 5</span></td>
                  </tr>
                  <tr>
                    <td><FileText size={14} className="me-2"/>Recensement Agricole - Ouest</td>
                    <td>Déc 2025</td>
                    <td className="text-center"><span className="badge bg-light text-dark">3.8 / 5</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailsEnqueteur;