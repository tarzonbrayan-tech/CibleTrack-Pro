import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Phone, MapPin, GraduationCap, Briefcase, Info } from 'lucide-react';

const ModifierEnqueteur = ({ enqueteurs, modifierEnqueteur }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const cible = enqueteurs.find(e => e.id === parseInt(id));
    if (cible) {
      setFormData(cible);
    } else {
      navigate('/suivi-global-enqueteurs');
    }
  }, [id, enqueteurs, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    modifierEnqueteur(formData);
    alert("Informations de l'enquêteur mises à jour !");
    navigate('/suivi-global-enqueteurs');
  };

  if (!formData) return <div className="p-5 text-center">Chargement...</div>;

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <button className="btn btn-outline-dark rounded-circle" onClick={() => navigate('/suivi-global-enqueteurs')}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="fw-bold mb-0">Modifier l'Enquêteur : <span className="text-primary">{formData.matricule}</span></h2>
      </div>

      <div className="card shadow-lg border-0 p-4 p-md-5 bg-white">
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            
            {/* SECTION 1 : ÉTAT CIVIL */}
            <div className="col-12 border-bottom pb-2 mb-2">
              <h5 className="text-muted fw-bold text-uppercase small"><User size={18} className="me-2"/>Informations Personnelles</h5>
            </div>
            
            <div className="col-md-6">
              <label className="form-label fw-bold">Nom</label>
              <input type="text" name="nom" className="form-control" value={formData.nom} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Prénom</label>
              <input type="text" name="prenom" className="form-control" value={formData.prenom} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Genre</label>
              <select name="genre" className="form-select" value={formData.genre} onChange={handleChange}>
                <option value="Masculin">Masculin</option>
                <option value="Féminin">Féminin</option>
                <option value="Autres">Autres</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold"><Phone size={16} className="me-1"/> Téléphone</label>
              <input type="text" name="telephone" className="form-control" value={formData.telephone} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold"><MapPin size={16} className="me-1"/> Ville</label>
              <input type="text" name="ville" className="form-control" value={formData.ville} onChange={handleChange} required />
            </div>

            {/* SECTION 2 : ÉTUDES ET EXPÉRIENCE */}
            <div className="col-12 border-bottom pb-2 mb-2 mt-5">
              <h5 className="text-muted fw-bold text-uppercase small"><GraduationCap size={18} className="me-2"/>Profil Académique & Pro</h5>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-bold">Niveau d'études</label>
              <select name="niveau" className="form-select" value={formData.niveau} onChange={handleChange}>
                <option value="BAC">BAC</option>
                <option value="BTS">BTS</option>
                <option value="DUT">DUT</option>
                <option value="LICENSE">LICENSE</option>
                <option value="MASTER">MASTER</option>
                <option value="DOCTORAT">DOCTORAT</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Domaine d'études</label>
              <input type="text" name="domaine" className="form-control" value={formData.domaine} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold"><Briefcase size={16} className="me-1"/> Expérience</label>
              <select name="experience" className="form-select" value={formData.experience} onChange={handleChange}>
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Professionnel">Professionnel</option>
              </select>
            </div>

            {/* SECTION 3 : STATUT ADMINISTRATIF */}
            <div className="col-12 border-bottom pb-2 mb-2 mt-5">
              <h5 className="text-muted fw-bold text-uppercase small"><Info size={18} className="me-2"/>Statut Mission</h5>
            </div>

            <div className="col-md-6 mx-auto">
              <div className="card border-info bg-light p-3">
                <label className="form-label fw-bold text-info text-center d-block">Modifier le Statut de l'enquêteur</label>
                <select 
                  name="statut" 
                  className={`form-select fw-bold text-center ${formData.statut === 'Exclus' ? 'text-danger' : ''}`} 
                  value={formData.statut} 
                  onChange={handleChange}
                >
                  <option value="Bien">Bien (Actif)</option>
                  <option value="Indisponible">Indisponible</option>
                  <option value="Blâmer">Blâmer (Avertissement)</option>
                  <option value="Exclus">Exclus (Radiation)</option>
                </select>
              </div>
            </div>

            <div className="col-12 d-grid gap-3 mt-5">
              <button type="submit" className="btn btn-primary btn-lg fw-bold shadow">
                <Save size={20} className="me-2"/> Enregistrer les modifications
              </button>
              <button type="button" className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/suivi-global-enqueteurs')}>
                Annuler
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifierEnqueteur;